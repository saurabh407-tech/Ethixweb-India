import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Code2, Sparkles, Terminal } from 'lucide-react';
import { triggerParticleBurst } from '../../utils/particleEffect';

export default function About() {
  useEffect(() => {
    document.title = 'About Ethixweb India | Digital Operations & Engineering';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-charcoal-950 text-white min-h-screen">
      {/* Editorial Main Section — Story & Studio */}
      <section className="pt-12 sm:pt-20 pb-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Team Studio Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-charcoal-800/80 bg-charcoal-900 shadow-2xl group">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/assets/team-studio.jpg"
                  alt="Ethixweb senior engineering team collaborating in studio"
                  width="1024"
                  height="768"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Authentic Pill Badge — Signature Ethixweb Detail */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-charcoal-950/90 backdrop-blur-md border border-charcoal-800/90 rounded-2xl px-4 py-2.5 shadow-xl">
                <div className="text-xs sm:text-sm font-extrabold text-brand-500 tracking-tight">
                  Since 2020
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-charcoal-400">
                  Senior-Led Team
                </div>
              </div>

              {/* Bottom Subtle Gradient Rim */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-charcoal-950/80 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Editorial Narrative (Strictly 66 Words) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-brand-500/80 tracking-tight">
                01
              </div>
              <div className="w-16 h-0.5 bg-brand-500/40 rounded-full" />
              <div className="text-xs font-bold uppercase tracking-widest text-brand-500 pt-1">
                Our Story
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Built for businesses tired of big agency theater.
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-charcoal-300 leading-relaxed font-normal">
              <p>
                We started Ethixweb because we were tired of watching good businesses get mediocre results from agencies that overpromise and underdeliver.
              </p>
              <p>
                We're a tight-knit team of developers, designers, and strategists, each senior in their craft. When you work with Ethixweb, you work directly with the people building your project. No account managers passing messages. No juniors learning on your budget.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/contact"
                onClick={triggerParticleBurst}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-charcoal-950 bg-white hover:bg-brand-500 hover:text-white transition-all shadow-lg active:scale-95 overflow-hidden"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/services"
                className="text-xs font-semibold text-charcoal-400 hover:text-white px-3 py-2 transition-colors"
              >
                Explore Capabilities &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Our Working Standard (Crisp 3-Column Minimal Editorial) */}
      <section className="py-20 bg-charcoal-900/60 border-t border-charcoal-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-2">
            <div className="text-2xl font-mono font-bold text-brand-500/80">02</div>
            <div className="w-12 h-0.5 bg-brand-500/40 rounded-full" />
            <div className="text-xs font-bold uppercase tracking-widest text-brand-500 pt-1">
              Working Standard
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
              Three rules we never compromise on.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-charcoal-950 border border-charcoal-800/80 space-y-3">
              <div className="text-xs font-mono font-bold text-brand-500">01 / HONESTY</div>
              <h3 className="text-lg font-bold text-white">Technical Directness</h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">
                If an existing off-the-shelf tool solves your problem better than custom engineering, we tell you candidly before a single rupee is spent.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-charcoal-950 border border-charcoal-800/80 space-y-3">
              <div className="text-xs font-mono font-bold text-brand-500">02 / OWNERSHIP</div>
              <h3 className="text-lg font-bold text-white">100% Code & IP Freedom</h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">
                You hold complete ownership of all source code, database architectures, and deployment keys. No proprietary traps or vendor lock-in.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-charcoal-950 border border-charcoal-800/80 space-y-3">
              <div className="text-xs font-mono font-bold text-brand-500">03 / VELOCITY</div>
              <h3 className="text-lg font-bold text-white">Senior Hands-On Craft</h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">
                Every milestone is architected and built by experienced specialists. You get production-grade systems that run reliably day and night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Technology Stack */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-charcoal-850">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-1">
              Production Stack
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tested tools. No experimental bloat.
            </h2>
          </div>
          <span className="text-xs font-mono text-charcoal-400">
            Node.js • React 18 • MongoDB Atlas • Vite • Tailwind
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[
            { name: 'React 18', role: 'Interface Architecture' },
            { name: 'Vite', role: 'Optimized Bundler' },
            { name: 'Tailwind CSS', role: 'Curated Design Tokens' },
            { name: 'Node.js', role: 'Runtime Services' },
            { name: 'Express.js', role: 'RESTful API Layer' },
            { name: 'MongoDB', role: 'Document Database' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-charcoal-900/80 border border-charcoal-800/80 text-center hover:border-brand-500/40 transition-colors"
            >
              <div className="text-sm font-bold text-white">{item.name}</div>
              <div className="text-[11px] font-mono text-brand-400 mt-1">{item.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
