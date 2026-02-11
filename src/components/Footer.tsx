import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-health-teal rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold">
                NeuroSync
              </h3>
            </div>
            <p className="font-paragraph text-base text-slate-300 max-w-md leading-relaxed">
              Advanced voice-based cognitive health tracking. Monitor your brain health with clinical precision and actionable insights.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-paragraph text-base text-slate-300 hover:text-primary transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/record"
                  className="font-paragraph text-base text-slate-300 hover:text-primary transition-colors duration-300"
                >
                  Record
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="font-paragraph text-base text-slate-300 hover:text-primary transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/comparison"
                  className="font-paragraph text-base text-slate-300 hover:text-primary transition-colors duration-300"
                >
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-4">
              Features
            </h4>
            <ul className="space-y-3">
              <li className="font-paragraph text-base text-slate-300">
                Voice Analysis
              </li>
              <li className="font-paragraph text-base text-slate-300">
                Cognitive Tracking
              </li>
              <li className="font-paragraph text-base text-slate-300">
                Health Insights
              </li>
              <li className="font-paragraph text-base text-slate-300">
                Secure & Private
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700">
          <p className="font-paragraph text-sm text-slate-400 text-center">
            © {new Date().getFullYear()} NeuroSync. Advanced cognitive health monitoring through voice analysis.
          </p>
        </div>
      </div>
    </footer>
  );
}
