import React from 'react';
import { ShieldCheck, Code, Zap, RefreshCw, Layers, FileCheck2 } from 'lucide-react';

const REASONS = [
  {
    icon: ShieldCheck,
    title: '100% Code & IP Ownership',
    desc: 'You own every repository commit, database schema, and deployment configuration from day one. No vendor lock-in or proprietary licensing traps.',
  },
  {
    icon: FileCheck2,
    title: 'Fixed-Scope Milestones',
    desc: 'We define transparent scopes with clear deliverables. Payments are linked to verified milestone completion rather than open-ended billing.',
  },
  {
    icon: Zap,
    title: 'Engineered for Indian Realities',
    desc: 'Architected specifically for Indian networks: fast initial paints on mobile 4G/5G, Razorpay/UPI gateway resilience, and WhatsApp API connectors.',
  },
  {
    icon: Code,
    title: 'Direct Senior Engineering Access',
    desc: 'You work directly with hands-on engineers who build and deploy your software, avoiding layers of non-technical account managers.',
  },
  {
    icon: Layers,
    title: 'Clean, Modern Tech Stack',
    desc: 'We build on proven modern foundations—React, Node.js, Vite, and MongoDB—ensuring your system remains simple for any developer to maintain.',
  },
  {
    icon: RefreshCw,
    title: 'Post-Launch Care & SLA',
    desc: 'Every deployment includes post-launch monitoring, fast response times for critical fixes, and continuous technical maintenance options.',
  },
];

export default function WhyEthixweb() {
  return (
    <section className="py-24 bg-charcoal-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Why statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>The Ethixweb Principle</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              An engineering partner with no agency fluff.
            </h2>

            <p className="text-sm sm:text-base text-charcoal-400 leading-relaxed">
              Most digital agencies sell high-gloss proposals and hand off execution to junior interns. Ethixweb operates as a focused digital operations unit—bringing senior code craftsmanship, predictable timelines, and honest technical guidance to growing Indian businesses.
            </p>

            {/* Standout feature box */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                Ethical by Design
              </h4>
              <p className="text-xs text-charcoal-400 leading-relaxed">
                If a requested feature won't move your business metric or can be accomplished with a simpler off-the-shelf integration, we tell you upfront before you invest engineering budget.
              </p>
            </div>
          </div>

          {/* Right Column: Key differentiators */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {REASONS.map((r, idx) => {
              const Icon = r.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-brand-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-charcoal-950 border border-charcoal-800 text-brand-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{r.title}</h3>
                  <p className="text-xs text-charcoal-400 leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
