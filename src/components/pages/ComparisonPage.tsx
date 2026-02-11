import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { VoiceRecordings } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ComparisonPage() {
  const [recordings, setRecordings] = useState<VoiceRecordings[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const result = await BaseCrudService.getAll<VoiceRecordings>('voicerecordings');
      setRecordings(result.items);
    } catch (error) {
      console.error('Error loading recordings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDeviation = (baseline: number, current: number) => {
    if (baseline === 0) return 0;
    return Math.round(((current - baseline) / baseline) * 100);
  };

  const getDeviationIcon = (deviation: number) => {
    if (deviation > 5) return <TrendingUp className="w-5 h-5" />;
    if (deviation < -5) return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  const getDeviationColor = (deviation: number, metric: 'cognitive' | 'stress' | 'fatigue') => {
    if (metric === 'cognitive') {
      if (deviation > 5) return 'text-primary';
      if (deviation < -5) return 'text-destructive';
      return 'text-foreground/60';
    }
    if (deviation > 5) return 'text-destructive';
    if (deviation < -5) return 'text-primary';
    return 'text-foreground/60';
  };

  const baseline = recordings[0];
  const comparisons = recordings.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full py-16 md:py-24" style={{ minHeight: '600px' }}>
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
              Recording Comparison
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              Side-by-side analysis with deviation metrics from baseline
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
              {/* Baseline Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-primary/5 rounded-2xl p-8 shadow-lg border border-primary/10 mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-3xl text-foreground">
                    {baseline?.recordingLabel || 'Baseline Recording'}
                  </h2>
                  <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-medical-blue/10 text-primary text-sm font-semibold rounded-lg border border-primary/20">
                    Baseline
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-2">
                      Cognitive Score
                    </p>
                    <p className="font-paragraph text-4xl bg-gradient-to-r from-primary to-medical-blue bg-clip-text text-transparent font-bold">
                      {baseline?.cognitiveScore || 0}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-2">
                      Stress Level
                    </p>
                    <p className="font-paragraph text-4xl bg-gradient-to-r from-health-teal to-medical-blue bg-clip-text text-transparent font-bold">
                      {baseline?.stressLevel || 0}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-2">
                      Fatigue Index
                    </p>
                    <p className="font-paragraph text-4xl bg-gradient-to-r from-medical-blue to-primary bg-clip-text text-transparent font-bold">
                      {baseline?.fatigueIndex || 0}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Comparison Cards */}
              {comparisons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {comparisons.map((recording, index) => {
                    const cognitiveDeviation = calculateDeviation(
                      baseline?.cognitiveScore || 0,
                      recording.cognitiveScore || 0
                    );
                    const stressDeviation = calculateDeviation(
                      baseline?.stressLevel || 0,
                      recording.stressLevel || 0
                    );
                    const fatigueDeviation = calculateDeviation(
                      baseline?.fatigueIndex || 0,
                      recording.fatigueIndex || 0
                    );

                    return (
                      <motion.div
                        key={recording._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all"
                      >
                        <h3 className="font-heading text-2xl text-foreground mb-6">
                          {recording.recordingLabel}
                        </h3>

                        {/* Cognitive Score */}
                        <div className="mb-6 pb-6 border-b border-light-grey">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-paragraph text-sm text-foreground/60">
                              Cognitive Score
                            </p>
                            <div
                              className={`flex items-center gap-2 ${getDeviationColor(
                                cognitiveDeviation,
                                'cognitive'
                              )}`}
                            >
                              {getDeviationIcon(cognitiveDeviation)}
                              <span className="font-paragraph text-sm font-semibold">
                                {cognitiveDeviation > 0 ? '+' : ''}
                                {cognitiveDeviation}%
                              </span>
                            </div>
                          </div>
                          <p className="font-paragraph text-3xl bg-gradient-to-r from-primary to-medical-blue bg-clip-text text-transparent font-bold">
                            {recording.cognitiveScore || 0}
                          </p>
                        </div>

                        {/* Stress Level */}
                        <div className="mb-6 pb-6 border-b border-light-grey">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-paragraph text-sm text-foreground/60">
                              Stress Level
                            </p>
                            <div
                              className={`flex items-center gap-2 ${getDeviationColor(
                                stressDeviation,
                                'stress'
                              )}`}
                            >
                              {getDeviationIcon(stressDeviation)}
                              <span className="font-paragraph text-sm font-semibold">
                                {stressDeviation > 0 ? '+' : ''}
                                {stressDeviation}%
                              </span>
                            </div>
                          </div>
                          <p className="font-paragraph text-3xl bg-gradient-to-r from-health-teal to-medical-blue bg-clip-text text-transparent font-bold">
                            {recording.stressLevel || 0}
                          </p>
                        </div>

                        {/* Fatigue Index */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-paragraph text-sm text-foreground/60">
                              Fatigue Index
                            </p>
                            <div
                              className={`flex items-center gap-2 ${getDeviationColor(
                                fatigueDeviation,
                                'fatigue'
                              )}`}
                            >
                              {getDeviationIcon(fatigueDeviation)}
                              <span className="font-paragraph text-sm font-semibold">
                                {fatigueDeviation > 0 ? '+' : ''}
                                {fatigueDeviation}%
                              </span>
                            </div>
                          </div>
                          <p className="font-paragraph text-3xl bg-gradient-to-r from-medical-blue to-primary bg-clip-text text-transparent font-bold">
                            {recording.fatigueIndex || 0}
                          </p>
                        </div>

                        {/* Submission Date */}
                        {recording.submissionDate && (
                          <div className="mt-6 pt-6 border-t border-light-grey">
                            <p className="font-paragraph text-sm text-foreground/50">
                              Recorded:{' '}
                              {new Date(recording.submissionDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-paragraph text-lg text-foreground/60">
                    Record more samples to see comparisons
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
