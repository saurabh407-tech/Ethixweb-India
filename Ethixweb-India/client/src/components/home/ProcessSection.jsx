import React from 'react';
import { Search, Compass, Cpu, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Scope & Architecture',
    desc: 'We map data schemas, user flows, and API boundaries before writing code. You get fixed-scope clarity with zero surprises.',
  },
  {
    num: '02',
    title: 'Sprint-Based Execution',
    desc: 'Structured 2-week milestones with live preview deployments. You see real, clickable progress throughout every phase.',
  },
  {
    num: '03',
    title: 'Security & Quality Audit',
    desc: 'Cross-browser testing, input sanitization, rate-limiting verification, and Core Web Vitals optimization.',
  },
  {
    num: '04',
    title: 'Deployment & SLA Care',
    desc: 'Zero-downtime production cutover, DNS routing, and ongoing server health monitoring for peace of mind.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-charcoal-900/60 border-t border-charcoal-850 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-500">
            Working Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How we take software from scope to scale.
          </h2>
          <p className="text-sm text-charcoal-400 pt-1 leading-relaxed">
            A sprint-driven operating model that eliminates agency bloat and delivers production-grade software on schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="studio-card rounded-3xl p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="text-2xl font-mono font-bold text-brand-500/80 mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-400 mt-2.5 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-charcoal-500">
                <CheckCircle2 className="w-3 h-3 text-brand-500/60" />
                <span>Verified Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
