import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-20 sm:pt-10 sm:pb-28 lg:pt-16 lg:pb-36 bg-charcoal-950 text-white">
      {/* Background Spiderweb SVG & Ambient Red Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 select-none overflow-hidden">
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
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[36rem] rounded-full bg-brand-500/20 blur-[130px] opacity-70"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>Digital Operations & Tech Partner for India</span>
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
              Ethixweb manages your digital infrastructure—from conversion-focused web applications and AI workflow automations to CRM pipelines, SEO, and continuous engineering support. Engineered specifically for Indian startups and growing SMEs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start A Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-charcoal-200 bg-charcoal-900/90 hover:bg-charcoal-800 border border-charcoal-800 hover:border-charcoal-700 transition-all"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>

            {/* Practical value pillars */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-charcoal-850/80 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-xs text-charcoal-300 leading-tight">
                  Zero vendor lock-in; 100% code ownership
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-xs text-charcoal-300 leading-tight">
                  Senior developers on every milestone
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-xs text-charcoal-300 leading-tight">
                  Transparent Indian pricing & deliverables
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Tech Mockup with Ethixweb Emblem */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative card */}
              <div className="rounded-3xl bg-charcoal-900/90 border border-charcoal-800 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                {/* Red ambient corner glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-500/80" />
                    <div className="w-3 h-3 rounded-full bg-charcoal-700" />
                    <div className="w-3 h-3 rounded-full bg-charcoal-700" />
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/ethixweb.png"
                      alt="Ethixweb"
                      width="20"
                      height="20"
                      decoding="async"
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-[11px] font-mono text-charcoal-400">ethixweb-core::v2</span>
                  </div>
                </div>

                {/* Live System Diagnostics */}
                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800/80">
                    <div className="flex justify-between text-charcoal-400 text-[11px] mb-1">
                      <span>Stack Engine</span>
                      <span className="text-emerald-400 font-semibold">Active</span>
                    </div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-brand-500" />
                      React 18 + Node.js + MongoDB Atlas
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800/80">
                    <div className="flex justify-between text-charcoal-400 text-[11px] mb-1">
                      <span>Automated Operations</span>
                      <span className="text-brand-400 font-semibold">Configured</span>
                    </div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      Lead Routing, CRM Sync & Security
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800/80">
                    <div className="flex justify-between text-charcoal-400 text-[11px] mb-1">
                      <span>Operating Region</span>
                      <span className="text-charcoal-300">IST Hub</span>
                    </div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Indian Startups & Global Marketplaces
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-charcoal-800 flex items-center justify-between text-xs text-charcoal-400">
                  <span>Architecture SLA: 99.9% Uptime</span>
                  <Link
                    to="/contact"
                    className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1"
                  >
                    Get Scoping Call <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
