import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Heart, Clock } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { VoiceRecordings, AnalysisMarkers } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const [recordings, setRecordings] = useState<VoiceRecordings[]>([]);
  const [markers, setMarkers] = useState<AnalysisMarkers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [recordingsResult, markersResult] = await Promise.all([
        BaseCrudService.getAll<VoiceRecordings>('voicerecordings'),
        BaseCrudService.getAll<AnalysisMarkers>('analysismarkers'),
      ]);
      setRecordings(recordingsResult.items);
      setMarkers(markersResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = recordings.map((rec) => ({
    name: rec.recordingLabel?.replace('Recording ', 'R') || 'Unknown',
    'Cognitive Score': rec.cognitiveScore || 0,
    'Stress Level': rec.stressLevel || 0,
    'Fatigue Index': rec.fatigueIndex || 0,
  }));

  const averages = {
    cognitive: recordings.length > 0
      ? Math.round(recordings.reduce((sum, rec) => sum + (rec.cognitiveScore || 0), 0) / recordings.length)
      : 0,
    stress: recordings.length > 0
      ? Math.round(recordings.reduce((sum, rec) => sum + (rec.stressLevel || 0), 0) / recordings.length)
      : 0,
    fatigue: recordings.length > 0
      ? Math.round(recordings.reduce((sum, rec) => sum + (rec.fatigueIndex || 0), 0) / recordings.length)
      : 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full py-16 md:py-24" style={{ minHeight: '600px' }}>
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
              Analysis Dashboard
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Comprehensive insights from your voice recordings
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : recordings.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/60">
                No recordings found. Please record your voice samples first.
              </p>
            </div>
          ) : (
            <>
              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl text-foreground">
                      Cognitive Score
                    </h3>
                  </div>
                  <p className="font-paragraph text-5xl text-primary font-bold mb-2">
                    {averages.cognitive}
                  </p>
                  <p className="font-paragraph text-sm text-foreground/60">
                    Average across all recordings
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-heading text-2xl text-foreground">
                      Stress Level
                    </h3>
                  </div>
                  <p className="font-paragraph text-5xl text-secondary font-bold mb-2">
                    {averages.stress}
                  </p>
                  <p className="font-paragraph text-sm text-foreground/60">
                    Average stress indicator
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-muted-purple/10 rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6 text-muted-purple" />
                    </div>
                    <h3 className="font-heading text-2xl text-foreground">
                      Fatigue Index
                    </h3>
                  </div>
                  <p className="font-paragraph text-5xl text-muted-purple font-bold mb-2">
                    {averages.fatigue}
                  </p>
                  <p className="font-paragraph text-sm text-foreground/60">
                    Mental fatigue measurement
                  </p>
                </motion.div>
              </div>

              {/* Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-16"
              >
                <h2 className="font-heading text-3xl text-foreground mb-8">
                  Recording Comparison
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#333333', fontFamily: 'sora' }}
                    />
                    <YAxis tick={{ fill: '#333333', fontFamily: 'sora' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        fontFamily: 'sora',
                      }}
                    />
                    <Legend wrapperStyle={{ fontFamily: 'sora' }} />
                    <Bar dataKey="Cognitive Score" fill="#4A90E2" />
                    <Bar dataKey="Stress Level" fill="#8E44AD" />
                    <Bar dataKey="Fatigue Index" fill="#A076A8" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Timeline Markers */}
              {markers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl p-8 shadow-sm"
                >
                  <h2 className="font-heading text-3xl text-foreground mb-8">
                    Analysis Timeline
                  </h2>
                  <div className="space-y-6">
                    {markers.map((marker, index) => (
                      <div
                        key={marker._id}
                        className="flex gap-6 pb-6 border-b border-light-grey last:border-b-0"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-paragraph text-sm text-foreground/60">
                              {marker.timestamp}
                            </span>
                            {marker.issueCategory && (
                              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-paragraph rounded-full">
                                {marker.issueCategory}
                              </span>
                            )}
                          </div>
                          <h4 className="font-heading text-xl text-foreground mb-2">
                            {marker.detectedIssue}
                          </h4>
                          <p className="font-paragraph text-base text-foreground/70">
                            {marker.explanation}
                          </p>
                          {marker.recordingIdentifier && (
                            <p className="font-paragraph text-sm text-foreground/50 mt-2">
                              Recording: {marker.recordingIdentifier}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
