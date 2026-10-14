import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Terminal } from 'lucide-react';
import { triggerParticleBurst } from '../../utils/particleEffect';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28 lg:pt-20 lg:pb-32 bg-charcoal-950 text-white">
      {/* Subtle Spiderweb Vector & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25 select-none overflow-hidden">
        <img
          src="/assets/spiderweb.svg"
          alt=""
          width="1152"
          height="600"
          aria-hidden="true"
          decoding="async"
          className="w-full max-w-6xl h-auto object-contain transform scale-110 lg:scale-125"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Radial crimson glow at top center */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[36rem] rounded-full bg-brand-500/15 blur-[140px] opacity-70"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span>Senior Digital Product & Web Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              We run the <span className="text-white">tech.</span>
              <br />
              You run the{' '}
              <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-red-600 bg-clip-text text-transparent">
                business.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A dedicated technical partner for growing Indian businesses and modern ventures. We design and engineer dependable web platforms, custom operational software, and automated workflows.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/contact"
                onClick={triggerParticleBurst}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-charcoal-950 bg-white hover:bg-brand-500 hover:text-white shadow-xl transition-all active:scale-95 overflow-hidden"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold text-charcoal-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.08] hover:border-white/[0.16] transition-colors"
              >
                <span>View Capabilities</span>
              </Link>
            </div>

            {/* Value Pillars */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 border-t border-white/[0.06] text-xs text-charcoal-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                Senior developers only
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                100% IP & code ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                Fixed milestone roadmaps
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Studio Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md studio-card rounded-3xl p-7 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-charcoal-400">
                  <Terminal className="w-3.5 h-3.5 text-brand-500" />
                  <span>ethixweb::engineering</span>
                </div>
              </div>

              {/* Core Delivery Commitments */}
              <div className="mt-5 space-y-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="text-[10px] font-mono text-brand-500 font-bold uppercase tracking-wider mb-1">
                    01 / Digital Platforms
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Commercial Web Applications & Portals
                  </div>
                  <div className="text-xs text-charcoal-400 mt-1">
                    React 18 • Vite • Tailwind • Core Web Vitals 95+
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="text-[10px] font-mono text-brand-500 font-bold uppercase tracking-wider mb-1">
                    02 / Integrations
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Inbound CRM & Lead Automation
                  </div>
                  <div className="text-xs text-charcoal-400 mt-1">
                    MongoDB Atlas • Webhooks • Secure Auth Pipeline
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="text-[10px] font-mono text-brand-500 font-bold uppercase tracking-wider mb-1">
                    03 / Reliability
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Senior-Led Direct Collaboration
                  </div>
                  <div className="text-xs text-charcoal-400 mt-1">
                    Direct access to engineers architecting your project.
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-charcoal-400">
                <span>Direct Remote Studio</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Accepting Q4 Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
