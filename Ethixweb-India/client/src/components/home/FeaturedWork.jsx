import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, Shield, Sparkles } from 'lucide-react';
import { triggerParticleBurst } from '../../utils/particleEffect';

const PROJECTS = [
  {
    index: '01',
    category: 'B2B COMMERCE & ERP',
    title: 'High-Volume Wholesale Ordering & Automated GST Engine',
    summary:
      'Engineered for wholesale distribution with tiered dealer pricing, real-time inventory reservation, and automated WhatsApp GST invoice delivery.',
    metric: 'Sub-800ms Checkout Flow',
    stack: ['React 18', 'Node.js', 'MongoDB Atlas', 'WhatsApp Webhooks'],
  },
  {
    index: '02',
    category: 'HEALTHCARE & OPERATIONS',
    title: 'Multi-Location Patient Scheduling & Intake Pipeline',
    summary:
      'Centralized clinic management with conflict-free doctor slot allocation, automated appointment reminders, and encrypted patient intake records.',
    metric: 'Zero Double-Booking SLA',
    stack: ['React Router', 'Node.js API', 'JWT Security', 'Mongoose ODM'],
  },
  {
    index: '03',
    category: 'HEADLESS D2C COMMERCE',
    title: 'Fast Consumer Goods Catalog & Analytics Hub',
    summary:
      'Performance-first retail storefront designed for low-bandwidth mobile networks, conversion-optimized checkout, and real-time revenue analytics.',
    metric: '98/100 Core Web Vitals',
    stack: ['Vite', 'Tailwind CSS', 'Redis Cache', 'RESTful Services'],
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-24 bg-charcoal-950 text-white relative overflow-hidden">
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-80 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none animate-soft-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-500">
              Selected Architectures
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Systems built for Indian scale.
            </h2>
            <p className="text-sm text-charcoal-400 pt-1 leading-relaxed">
              Verified concept studies demonstrating high-throughput order queues, resilient schema design, and sub-second mobile performance.
            </p>
          </div>
          <Link
            to="/contact"
            onClick={triggerParticleBurst}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-300 hover:text-white transition-colors"
          >
            <span>Have a custom system need? Discuss Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Soft, Editorial Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {PROJECTS.map((proj) => (
            <div
              key={proj.index}
              className="studio-card rounded-3xl p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Top Category & Index */}
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
                  <span className="text-[11px] font-mono tracking-wider text-brand-400 font-semibold">
                    {proj.category}
                  </span>
                  <span className="text-sm font-mono text-charcoal-500 font-bold">
                    {proj.index}
                  </span>
                </div>

                {/* Title & Concise Summary */}
                <h3 className="text-xl font-bold text-white mt-5 leading-snug group-hover:text-brand-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-sm text-charcoal-400 mt-3 leading-relaxed font-normal">
                  {proj.summary}
                </p>
              </div>

              {/* Metric & Tech Stack */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  <span>{proj.metric}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] text-charcoal-300 border border-white/[0.06]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
