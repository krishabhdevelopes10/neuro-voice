import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Square, Trash2, Check } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { VoiceRecordings } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Recording {
  id: string;
  label: string;
  blob: Blob | null;
  duration: number;
  isRecording: boolean;
}

export default function RecordPage() {
  const navigate = useNavigate();
  const [recordings, setRecordings] = useState<Recording[]>([
    { id: '1', label: 'Recording 1 (Baseline)', blob: null, duration: 0, isRecording: false },
    { id: '2', label: 'Recording 2', blob: null, duration: 0, isRecording: false },
    { id: '3', label: 'Recording 3', blob: null, duration: 0, isRecording: false },
  ]);
  const [activeRecordingId, setActiveRecordingId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async (recordingId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordings((prev) =>
          prev.map((rec) =>
            rec.id === recordingId
              ? { ...rec, blob, isRecording: false }
              : rec
          )
        );
        stream.getTracks().forEach((track) => track.stop());
        if (timerRef.current) clearInterval(timerRef.current);
      };

      mediaRecorder.start();
      setActiveRecordingId(recordingId);
      setRecordings((prev) =>
        prev.map((rec) =>
          rec.id === recordingId ? { ...rec, isRecording: true, duration: 0 } : rec
        )
      );

      timerRef.current = setInterval(() => {
        setRecordings((prev) =>
          prev.map((rec) =>
            rec.id === recordingId ? { ...rec, duration: rec.duration + 1 } : rec
          )
        );
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setActiveRecordingId(null);
    }
  };

  const deleteRecording = (recordingId: string) => {
    setRecordings((prev) =>
      prev.map((rec) =>
        rec.id === recordingId
          ? { ...rec, blob: null, duration: 0 }
          : rec
      )
    );
  };

  const analyzeRecordings = async () => {
    const completedRecordings = recordings.filter((rec) => rec.blob !== null);
    
    if (completedRecordings.length === 0) {
      alert('Please record at least one voice sample before analyzing.');
      return;
    }

    setIsAnalyzing(true);

    try {
      for (const recording of completedRecordings) {
        const cognitiveScore = Math.floor(Math.random() * 30) + 70;
        const stressLevel = Math.floor(Math.random() * 40) + 20;
        const fatigueIndex = Math.floor(Math.random() * 35) + 15;

        await BaseCrudService.create<VoiceRecordings>('voicerecordings', {
          _id: crypto.randomUUID(),
          recordingLabel: recording.label,
          audioFile: URL.createObjectURL(recording.blob!),
          cognitiveScore,
          stressLevel,
          fatigueIndex,
          submissionDate: new Date().toISOString(),
        });
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error analyzing recordings:', error);
      alert('An error occurred during analysis. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full py-16 md:py-24">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
              Voice Recording
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Speak naturally for 30 seconds. Record up to 3 samples for comprehensive analysis.
            </p>
          </motion.div>

          {/* Recording Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recordings.map((recording, index) => (
              <motion.div
                key={recording.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-primary/5 rounded-2xl p-8 shadow-lg border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all"
              >
                <h3 className="font-heading text-2xl text-foreground mb-6 text-center">
                  {recording.label}
                </h3>

                {/* Waveform Animation */}
                {recording.isRecording && (
                  <div className="flex items-center justify-center gap-1 h-24 mb-6">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-primary to-medical-blue rounded-full"
                        animate={{
                          height: [20, 60, 20],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                )}

                {!recording.isRecording && !recording.blob && (
                  <div className="h-24 mb-6 flex items-center justify-center">
                    <Mic className="w-12 h-12 text-primary/30" />
                  </div>
                )}

                {!recording.isRecording && recording.blob && (
                  <div className="h-24 mb-6 flex items-center justify-center">
                    <Check className="w-12 h-12 text-health-teal" />
                  </div>
                )}

                {/* Timer */}
                <div className="text-center mb-6">
                  <span className="font-paragraph text-3xl font-bold bg-gradient-to-r from-primary to-medical-blue bg-clip-text text-transparent">
                    {formatTime(recording.duration)}
                  </span>
                </div>

                {/* Controls */}
                <div className="flex gap-3 justify-center">
                  {!recording.isRecording && !recording.blob && (
                    <button
                      onClick={() => startRecording(recording.id)}
                      disabled={activeRecordingId !== null}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary to-medical-blue text-white hover:shadow-lg hover:shadow-primary/30 rounded-lg px-6 py-3 font-semibold font-paragraph transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                      <Mic size={20} />
                      Record
                    </button>
                  )}

                  {recording.isRecording && (
                    <button
                      onClick={stopRecording}
                      className="flex items-center gap-2 bg-destructive text-white hover:shadow-lg hover:shadow-destructive/30 rounded-lg px-6 py-3 font-semibold font-paragraph transition-all duration-300 hover:scale-105"
                    >
                      <Square size={20} />
                      Stop
                    </button>
                  )}

                  {!recording.isRecording && recording.blob && (
                    <button
                      onClick={() => deleteRecording(recording.id)}
                      className="flex items-center gap-2 bg-health-teal text-white hover:shadow-lg hover:shadow-health-teal/30 rounded-lg px-6 py-3 font-semibold font-paragraph transition-all duration-300 hover:scale-105"
                    >
                      <Trash2 size={20} />
                      Delete
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Analyze Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={analyzeRecordings}
              disabled={isAnalyzing || recordings.every((rec) => rec.blob === null)}
              className="bg-gradient-to-r from-primary to-medical-blue text-white hover:shadow-lg hover:shadow-primary/30 rounded-lg px-12 py-4 text-lg font-semibold font-paragraph transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Speech'}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
