import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, FileCode, CheckCircle2 } from 'lucide-react';

const CONCEPT_STUDIES = [
  {
    tag: 'Concept Architecture Study',
    title: 'Indian B2B Wholesale Ordering & Invoice Engine',
    category: 'Full-Stack Web Application',
    description:
      'Reference architecture for high-volume order entry, dynamic multi-tier pricing, GST calculation logic, and automated WhatsApp order confirmations.',
    technologies: ['React 18', 'Express.js', 'MongoDB Atlas', 'Tailwind CSS'],
    capabilities: [
      'Real-time inventory reserve & backorder queues',
      'Automated GST invoice generation schema',
      'Optimized for low-bandwidth mobile browsing',
    ],
  },
  {
    tag: 'Reference Implementation',
    title: 'Multi-Branch Healthcare Appointment & CRM Flow',
    category: 'Web Portal & Automation',
    description:
      'Concept blueprint featuring patient self-scheduling, automated SMS/WhatsApp reminders, doctor slot allocation, and centralized inquiry management.',
    technologies: ['React Router', 'Node.js', 'JWT Auth', 'Mongoose'],
    capabilities: [
      'Double-booking prevention algorithm',
      'Role-based admin access for clinic staff',
      'Patient intake form validation & storage',
    ],
  },
  {
    tag: 'Technical Proof of Concept',
    title: 'D2C Consumer Goods Brand Hub & Analytics Dashboard',
    category: 'E-Commerce & Digital Ops',
    description:
      'Performance-first headless commerce blueprint designed for sub-second page loads, conversion-optimized checkout, and customer lifetime value reporting.',
    technologies: ['Vite', 'REST API', 'Redis Cache Model', 'Chart Analytics'],
    capabilities: [
      'Sub-800ms Time-to-Interactive (TTI)',
      'Abandonment recovery webhook triggers',
      'Integrated admin CRM dashboard',
    ],
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-24 bg-charcoal-900 border-t border-charcoal-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Engineering Blueprints & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Architecture concepts built for Indian scale.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs text-charcoal-400 bg-charcoal-950 p-4 rounded-xl border border-charcoal-800 leading-relaxed">
              <span className="font-semibold text-charcoal-200 block mb-1">
                Transparency Notice:
              </span>
              The projects below are verified technical reference blueprints and concept studies engineered to demonstrate real architectural patterns, code quality, and data models.
            </p>
          </div>
        </div>

        {/* Concept Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONCEPT_STUDIES.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-charcoal-950 border border-charcoal-800 p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all duration-300 group"
            >
              <div>
                {/* Explicit Concept Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-500/10 text-brand-400 border border-brand-500/30">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-mono text-charcoal-500">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors mb-3">
                  {item.title}
                </h3>

                <p className="text-xs text-charcoal-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-2 mb-6">
                  {item.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-charcoal-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-5 border-t border-charcoal-800">
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-charcoal-400 border border-charcoal-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to discuss requirements */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-300 hover:text-white transition-colors"
          >
            <span>Have a unique system requirement? Let's discuss architecture</span>
            <ArrowUpRight className="w-4 h-4 text-brand-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
