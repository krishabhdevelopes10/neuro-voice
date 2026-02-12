const BACKEND_URL = "https://cognitive-health-backend.onrender.com";

export class BackendService {
  static async analyzeSpeech(audioBlob: Blob, userId: string) {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("user_id", userId);

    const response = await fetch(`${BACKEND_URL}/analyze-speech`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Backend error");
    return await response.json();
  }
}
