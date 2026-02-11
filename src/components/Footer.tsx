import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-light-grey">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-3xl text-foreground mb-4">
              NeuroSync
            </h3>
            <p className="font-paragraph text-base text-foreground/70 max-w-md leading-relaxed">
              Advanced voice-based cognitive health tracking platform. Monitor your brain health with precision and care.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-heading text-xl text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-paragraph text-base text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/record"
                  className="font-paragraph text-base text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  Record
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="font-paragraph text-base text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/comparison"
                  className="font-paragraph text-base text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="font-heading text-xl text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              <li className="font-paragraph text-base text-foreground/70">
                Voice Analysis
              </li>
              <li className="font-paragraph text-base text-foreground/70">
                Cognitive Tracking
              </li>
              <li className="font-paragraph text-base text-foreground/70">
                Health Insights
              </li>
              <li className="font-paragraph text-base text-foreground/70">
                Secure & Private
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-light-grey">
          <p className="font-paragraph text-sm text-foreground/60 text-center">
            © {new Date().getFullYear()} NeuroSync. Advanced cognitive health monitoring through voice analysis.
          </p>
        </div>
      </div>
    </footer>
  );
}
