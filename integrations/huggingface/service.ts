import { pipeline, env } from "@xenova/transformers";

// Allow transformers.js to use cache
env.allowRemoteModels = true;
env.allowLocalModels = true;

let transcriber: any = null;
let classifier: any = null;

async function initModels() {
  if (!transcriber) {
    console.log("Loading Whisper model...");
    transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny"
    );
  }
  if (!classifier) {
    console.log("Loading sentiment classifier...");
    classifier = await pipeline("sentiment-analysis", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");
  }
}

export class HuggingFaceService {
  static async analyzeSpeech(audioBlob: Blob): Promise<any> {
    try {
      // Initialize models if not already done
      await initModels();

      // Convert blob to array buffer
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(
        arrayBuffer.slice(0)
      );

      // Convert to float32 array
      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;

      // Transcribe audio
      console.log("Transcribing audio...");
      const result = await transcriber({
        audio: channelData,
        sampling_rate: sampleRate,
      });

      const transcript = result.text;

      // Analyze sentiment
      console.log("Analyzing sentiment...");
      const sentimentResult = await classifier(transcript);

      // Extract emotions and calculate stress score
      const emotions = sentimentResult.map((item: any) => ({
        label: item.label,
        score: Math.round(item.score * 100) / 100,
      }));

      const sentiment = sentimentResult[0].label;
      const confidence = sentimentResult[0].score;

      // Calculate stress score (0-100)
      // Negative sentiment = higher stress
      const stressScore =
        sentiment === "NEGATIVE" ? 70 + confidence * 30 : 30 - confidence * 20;

      return {
        status: "success",
        analysis: {
          transcript,
          stress_score: Math.max(0, Math.min(100, stressScore)),
          word_count: transcript.split(" ").length,
          speech_rate: 120.0,
          emotions,
          sentiment,
        },
      };
    } catch (error) {
      console.error("Error analyzing speech:", error);
      throw new Error("Failed to analyze speech");
    }
  }
}
