import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Code2,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Terminal,
} from 'lucide-react';
import FinalCTA from '../../components/home/FinalCTA';

export default function About() {
  useEffect(() => {
    document.title = 'About Ethixweb India | Digital Operations & Engineering';
  }, []);

  const principles = [
    {
      title: 'Technical Honesty',
      desc: 'We provide direct, objective counsel. If an off-the-shelf SaaS or simpler architecture solves your problem better than custom code, we tell you frankly before a single rupee is spent.',
    },
    {
      title: 'Complete IP & Code Ownership',
      desc: 'Clients retain 100% intellectual property rights, source repositories, database models, and cloud credentials. We build assets for your balance sheet, not proprietary traps.',
    },
    {
      title: 'Senior Engineering Direct Access',
      desc: 'We do not employ non-technical middlemen to relay requirements. You consult and plan directly with the senior developers who architect and write your software.',
    },
    {
      title: 'Grounded in Indian Business Realities',
      desc: 'From mobile-first performance on regional 4G/5G networks to Razorpay/UPI checkout flows and WhatsApp communication webhooks, we engineer for how India actually transacts.',
    },
  ];

  return (
    <div className="bg-charcoal-950 text-white min-h-screen">
      {/* Page Header */}
      <section className="py-20 sm:py-28 border-b border-charcoal-850 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-brand-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>Our Origin & Purpose</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Building digital operations without agency bloat.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-charcoal-400 leading-relaxed">
            Ethixweb India was formed to give growing businesses, startups, and SMEs a dependable technical partner that treats software engineering with discipline, ethics, and velocity.
          </p>
        </div>
      </section>

      {/* Grounded Narrative Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Indian businesses need a different kind of tech partner.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-charcoal-300 leading-relaxed">
              <p>
                In the Indian commercial landscape, companies are rapidly digitizing customer acquisition, inventory pipelines, and internal operations. Yet when seeking technical partners, businesses are typically faced with two extremes: freelance developers who vanish during critical production issues, or large legacy agencies that charge prohibitive retainers while handing actual coding off to junior trainees.
              </p>
              <p>
                Ethixweb India was shaped as an intentional alternative: a senior digital operations unit that takes ownership of your software infrastructure. Whether you are modernizing a traditional distribution business, launching an ambitious SaaS product, or automating client booking pipelines, we build clean, resilient systems that run smoothly 24 hours a day.
              </p>
              <p>
                We believe in straightforward contracts, milestone-based deliveries, and transparent Git commits. When we manage your technology, you are free to focus on what matters most: growing your business.
              </p>
            </div>
          </div>

          {/* Core Philosophy Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-charcoal-950 border border-charcoal-800 flex items-center justify-center text-brand-500">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">The Ethixweb Motto</h3>
                  <span className="text-xs font-mono text-brand-400">core::directive</span>
                </div>
              </div>

              <blockquote className="text-xl font-bold text-white leading-snug mb-4">
                "We run the tech. <br />
                You run the business."
              </blockquote>

              <p className="text-xs text-charcoal-400 leading-relaxed mb-6">
                Technology should never be a source of stress, surprise invoices, or fragile downtime. It should be a dependable, silent engine powering your everyday customer interactions and sales growth.
              </p>

              <div className="pt-6 border-t border-charcoal-800 flex items-center justify-between text-xs text-charcoal-400">
                <span>Location: India & Global Reach</span>
                <span className="text-emerald-400 font-semibold">Active Operations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Tenets */}
      <section className="py-20 bg-charcoal-900 border-y border-charcoal-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Core Tenets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Principles behind every project we deliver.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-charcoal-950 border border-charcoal-800 hover:border-brand-500/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-brand-500" />
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Stack Specialization */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Production Technology Stack
          </h2>
          <p className="text-sm text-charcoal-400 mt-2">
            Selected for high developer ergonomics, robust community ecosystem, and long-term maintainability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'React 18', role: 'Frontend UI' },
            { name: 'Vite', role: 'Build Engine' },
            { name: 'Tailwind CSS', role: 'Design Tokens' },
            { name: 'Node.js', role: 'Runtime API' },
            { name: 'Express.js', role: 'REST Services' },
            { name: 'MongoDB', role: 'Document Database' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 text-center"
            >
              <div className="text-sm font-bold text-white">{item.name}</div>
              <div className="text-[11px] font-mono text-brand-400 mt-1">{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
