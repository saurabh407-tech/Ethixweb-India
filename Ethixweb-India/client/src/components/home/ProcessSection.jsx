import React from 'react';
import { Search, Compass, Cpu, CheckSquare2, Radio } from 'lucide-react';

const WORKFLOW = [
  {
    step: '01',
    icon: Search,
    title: 'Audit & Scope Analysis',
    description:
      'We review your existing tech bottlenecks, user flows, conversion funnels, and infrastructure dependencies to define a high-clarity scope.',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Architecture Blueprint',
    description:
      'We draft the technical roadmap—component structure, database schema, API contracts, and integration points—before writing a single line of code.',
  },
  {
    step: '03',
    icon: Cpu,
    title: 'Sprint-Based Execution',
    description:
      'Development proceeds in structured 2-week milestones with continuous deployment previews. You see real, clickable progress every sprint.',
  },
  {
    step: '04',
    icon: CheckSquare2,
    title: 'Quality & Security Audit',
    description:
      'Rigorous cross-browser testing, mobile responsiveness checks, input validation testing, and load evaluation prior to cutover.',
  },
  {
    step: '05',
    icon: Radio,
    title: 'Live Launch & Operations',
    description:
      'Zero-downtime production deployment, DNS configuration, search console indexing, and proactive monitoring to ensure uninterrupted uptime.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-charcoal-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>The Operating Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How we take your project from scope to scale.
          </h2>
          <p className="mt-4 text-base text-charcoal-400 leading-relaxed">
            A transparent, sprint-driven workflow designed to eliminate guesswork, control delivery timelines, and keep communication clear.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {WORKFLOW.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-charcoal-900/90 border border-charcoal-800 p-6 flex flex-col justify-between hover:border-brand-500/40 hover:bg-charcoal-900 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-brand-500/90">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-charcoal-800 text-charcoal-300 flex items-center justify-center group-hover:text-white group-hover:bg-brand-500/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-charcoal-800 text-[10px] uppercase font-mono text-charcoal-500">
                  Phase {item.step} Protocol
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
