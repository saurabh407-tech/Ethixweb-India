import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-charcoal-900 border-t border-charcoal-850 relative overflow-hidden">
      {/* Background crimson ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-brand-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span>Start Your Digital Operation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto">
          Ready to eliminate technical roadblocks and scale your operations?
        </h2>

        <p className="text-sm sm:text-base text-charcoal-400 max-w-xl mx-auto leading-relaxed">
          Reach out today to discuss your website, custom portal, or workflow automation needs. We will review your requirements and provide an honest technical assessment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start A Project Inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:info@ethixweb.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-charcoal-300 bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-800 transition-colors"
          >
            <Mail className="w-4 h-4 text-brand-500" />
            <span>info@ethixweb.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
