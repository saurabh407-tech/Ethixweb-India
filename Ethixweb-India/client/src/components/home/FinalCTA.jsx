import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { triggerParticleBurst } from '../../utils/particleEffect';

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background crimson ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-brand-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span>Direct Senior Engineering</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-2xl mx-auto">
          Tired of agency theater? Let's build something solid.
        </h2>

        <p className="text-xs sm:text-sm text-charcoal-400 max-w-md mx-auto leading-relaxed">
          No account managers playing telephone. No bloated retainers. Just senior engineers building software that works.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <Link
            to="/contact"
            onClick={triggerParticleBurst}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-charcoal-950 bg-white hover:bg-brand-500 hover:text-white shadow-xl transition-all active:scale-95 overflow-hidden"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href="mailto:info@ethixweb.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold text-charcoal-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.08] hover:border-white/[0.16] transition-colors"
          >
            <Mail className="w-4 h-4 text-brand-500" />
            <span>info@ethixweb.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
