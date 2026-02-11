import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Brain, Activity, Heart, Zap, ArrowRight, Mic, BarChart3, ShieldCheck, Play } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HealthMetrics } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// HPI 1.7-G

// --- Utility Components ---

const SectionDivider = () => (
  <div className="w-full flex justify-center py-12 opacity-20">
    <div className="h-16 w-px bg-gradient-to-b from-transparent via-foreground to-transparent" />
  </div>
);

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [metrics, setMetrics] = useState<HealthMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Preserve original data fetching logic exactly
  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const result = await BaseCrudService.getAll<HealthMetrics>('healthmetrics');
      setMetrics(result.items);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const iconMap: Record<string, any> = {
    'Cognitive Sharpness': Brain,
    'Mental Fatigue': Activity,
    'Stress Levels': Heart,
    'Memory Recall': Zap,
  };

  // --- Animation Hooks ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yHero = useTransform(heroScroll, [0, 1], [0, 200]);
  const opacityHero = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary/20 selection:text-primary">
      <NoiseOverlay />
      <Header />

      {/* --- Hero Section: The Serene Opening --- */}
      <section ref={heroRef} className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ y: yHero }}
            className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-primary/5 to-secondary/5 blur-[120px]" 
          />
          <motion.div 
            style={{ y: useTransform(heroScroll, [0, 1], [0, -100]) }}
            className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-t from-primary/10 to-transparent blur-[100px]" 
          />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-block py-1 px-3 rounded-full border border-foreground/10 bg-white/50 backdrop-blur-sm text-xs font-paragraph tracking-widest uppercase text-foreground/60 mb-6">
              NeuroSync Intelligence
            </span>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-[0.9] mb-6">
              Track Your <br />
              <span className="text-primary italic font-light">Brain Health</span> <br />
              With Your Voice
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="font-paragraph text-lg md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Advanced AI analyzes just 30 seconds of daily speech to detect cognitive changes, stress patterns, and mental fatigue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <Link
              to="/record"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-white transition-all duration-300 bg-primary rounded-full overflow-hidden hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="relative z-10 flex items-center gap-2 font-paragraph">
                Start Recording <Mic className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
            </Link>
            
            <div className="flex items-center gap-4 text-sm font-paragraph text-foreground/50">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center text-[10px] overflow-hidden">
                     <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
                  </div>
                ))}
              </div>
              <span>Trusted by 10k+ users</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Marquee Section: Dynamic Flow --- */}
      <div className="w-full py-12 border-y border-foreground/5 bg-white/50 backdrop-blur-sm overflow-hidden">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 text-4xl md:text-6xl font-heading text-foreground/10 px-8">
            <span>Cognitive Clarity</span>
            <span>•</span>
            <span>Mental Resilience</span>
            <span>•</span>
            <span>Stress Analysis</span>
            <span>•</span>
            <span>Voice Biomarkers</span>
            <span>•</span>
            <span>Cognitive Clarity</span>
            <span>•</span>
            <span>Mental Resilience</span>
            <span>•</span>
            <span>Stress Analysis</span>
            <span>•</span>
            <span>Voice Biomarkers</span>
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 text-4xl md:text-6xl font-heading text-foreground/10 px-8">
            <span>Cognitive Clarity</span>
            <span>•</span>
            <span>Mental Resilience</span>
            <span>•</span>
            <span>Stress Analysis</span>
            <span>•</span>
            <span>Voice Biomarkers</span>
            <span>•</span>
            <span>Cognitive Clarity</span>
            <span>•</span>
            <span>Mental Resilience</span>
            <span>•</span>
            <span>Stress Analysis</span>
            <span>•</span>
            <span>Voice Biomarkers</span>
          </div>
        </div>
      </div>

      {/* --- The Science / Mission Section --- */}
      <section className="w-full py-32 md:py-48 px-6 md:px-12 max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -left-10 -top-10 w-32 h-32 border-t border-l border-primary/30 rounded-tl-3xl" />
            <h2 className="font-heading text-5xl md:text-7xl text-foreground leading-[1.1] mb-8">
              The Science of <br />
              <span className="text-secondary">Silent Signals.</span>
            </h2>
            <p className="font-paragraph text-xl text-foreground/70 leading-relaxed mb-8">
              Your voice is a window into your mind. Subtle changes in pitch, tone, rhythm, and pause patterns can reveal cognitive shifts long before they become apparent in daily life.
            </p>
            <p className="font-paragraph text-lg text-foreground/60 leading-relaxed">
              NeuroSync utilizes clinical-grade audio processing to decode these biomarkers, providing you with a transparent, actionable view of your neurological health.
            </p>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 border-b border-r border-primary/30 rounded-br-3xl" />
          </div>
          
          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden">
             <Image 
               src="https://static.wixstatic.com/media/61bde1_6036eda423914c18a7f580a47e9d2c62~mv2.png?originWidth=896&originHeight=576"
               alt="Abstract visualization of sound waves and neural networks"
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply" />
             
             {/* Floating Data Card Overlay */}
             <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="absolute bottom-12 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
             >
               <div className="flex items-center justify-between mb-4">
                 <span className="text-sm font-paragraph font-bold text-primary uppercase tracking-wider">Analysis Complete</span>
                 <span className="text-xs text-foreground/50">Just now</span>
               </div>
               <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "94%" }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="h-full bg-gradient-to-r from-primary to-secondary" 
                 />
               </div>
               <div className="mt-2 flex justify-between text-xs font-medium text-foreground/70">
                 <span>Processing Audio</span>
                 <span>94% Accuracy</span>
               </div>
             </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* --- Metrics Section: Sticky Side + Scrolling Cards --- */}
      <section className="w-full py-32 bg-background relative">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
                    What We Track
                  </h2>
                  <p className="font-paragraph text-lg text-foreground/70 mb-8 leading-relaxed">
                    Our sophisticated AI analyzes multiple dimensions of your cognitive health through voice patterns, translating complex biomarkers into clear, understandable metrics.
                  </p>
                  <div className="hidden lg:block w-20 h-1 bg-primary mb-8" />
                  <Link to="/record" className="hidden lg:inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300">
                    View Sample Report <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Scrolling Cards Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  // Loading Skeleton
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
                  ))
                ) : metrics.length > 0 ? (
                  metrics.map((metric, index) => {
                    const IconComponent = iconMap[metric.metricName || ''] || Brain;
                    return (
                      <motion.div
                        key={metric._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={cn(
                          "group relative p-8 rounded-3xl border border-foreground/5 bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2",
                          index % 2 === 1 ? "md:translate-y-12" : "" // Staggered layout effect
                        )}
                      >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                           <IconComponent className="w-24 h-24 text-primary" />
                        </div>

                        <div className="relative z-10">
                          <div className="w-14 h-14 mb-6 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            {metric.metricIcon ? (
                              <Image
                                src={metric.metricIcon}
                                alt={metric.metricName || 'Metric icon'}
                                width={32}
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <IconComponent className="w-7 h-7" />
                            )}
                          </div>
                          
                          <h3 className="font-heading text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                            {metric.metricName}
                          </h3>
                          
                          {metric.tagline && (
                            <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide text-secondary bg-secondary/5 rounded-full">
                              {metric.tagline}
                            </div>
                          )}
                          
                          {metric.description && (
                            <p className="font-paragraph text-sm text-foreground/60 leading-relaxed mb-6">
                              {metric.description}
                            </p>
                          )}

                          <div className="pt-6 border-t border-foreground/5 flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">Analysis</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="font-paragraph text-foreground/50">Metrics data currently unavailable.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Visual Breather: Parallax Image --- */}
      <section className="w-full h-[80vh] relative overflow-hidden flex items-center justify-center my-24">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0.4, 0.8], [-100, 100]) }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://static.wixstatic.com/media/61bde1_421e0e278c3241afb2f3406388bb3a2d~mv2.png?originWidth=1600&originHeight=960"
            alt="Calm water surface representing mental clarity"
            className="w-full h-[120%] object-cover brightness-[0.85]"
          />
        </motion.div>
        <div className="relative z-10 text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-heading text-5xl md:text-7xl text-white mb-6 drop-shadow-lg"
          >
            "Clarity is the first step <br/> towards control."
          </motion.h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full backdrop-blur-md" />
        </div>
      </section>

      {/* --- How It Works: Vertical Process --- */}
      <section className="w-full py-32 px-6 md:px-12 max-w-[100rem] mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-6">How It Works</h2>
          <p className="font-paragraph text-lg text-foreground/60">Three simple steps to cognitive empowerment.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />

          {[
            {
              step: '01',
              title: 'Record Your Voice',
              desc: 'Speak naturally for 30 seconds. Our system captures your speech patterns with clinical precision.',
              icon: Mic
            },
            {
              step: '02',
              title: 'AI Analysis',
              desc: 'Advanced algorithms analyze vocal biomarkers, speech patterns, and cognitive indicators instantly.',
              icon: Brain
            },
            {
              step: '03',
              title: 'Track Progress',
              desc: 'View detailed insights, compare recordings over time, and monitor your cognitive health trends.',
              icon: BarChart3
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={cn(
                "flex flex-col md:flex-row items-center gap-12 mb-24 last:mb-0 relative",
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Center Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary z-10 hidden md:block" />

              <div className="flex-1 text-left md:text-right">
                {index % 2 === 0 ? (
                  <div className="md:pr-16">
                    <span className="font-heading text-8xl text-primary/10 absolute -top-10 -left-10 md:left-auto md:right-10 -z-10">{item.step}</span>
                    <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-4">{item.title}</h3>
                    <p className="font-paragraph text-foreground/60 leading-relaxed">{item.desc}</p>
                  </div>
                ) : (
                  <div className="w-full h-64 md:h-80 bg-gray-50 rounded-2xl overflow-hidden relative group">
                     <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <item.icon className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                     </div>
                  </div>
                )}
              </div>

              <div className="flex-1 text-left">
                {index % 2 === 1 ? (
                  <div className="md:pl-16 relative">
                    <span className="font-heading text-8xl text-primary/10 absolute -top-10 -left-4 -z-10">{item.step}</span>
                    <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-4">{item.title}</h3>
                    <p className="font-paragraph text-foreground/60 leading-relaxed">{item.desc}</p>
                  </div>
                ) : (
                  <div className="w-full h-64 md:h-80 bg-gray-50 rounded-2xl overflow-hidden relative group">
                     <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <item.icon className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="w-full py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl mb-8">
              Ready to Listen to <br/> Your Mind?
            </h2>
            <p className="font-paragraph text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join thousands who are taking control of their cognitive health with NeuroSync's precision analysis.
            </p>
            <Link
              to="/record"
              className="inline-flex items-center justify-center px-12 py-6 text-lg font-medium text-foreground bg-white rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Start Your First Recording
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}