import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import EnquiryForm from '../../components/forms/EnquiryForm';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact & Project Scoping | Ethixweb India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-charcoal-950 text-white min-h-screen">
      {/* Page Header */}
      <section className="pt-12 sm:pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span>Direct Technical Scoping</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Let's discuss your next digital milestone.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-charcoal-400 max-w-xl mx-auto leading-relaxed">
          Direct evaluation by a senior engineer. No commissioned salespeople or communication telephone games.
        </p>
      </section>

      {/* Main Form & Contact Layout */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Editorial Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="studio-card rounded-3xl p-8 space-y-6">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-500 mb-1">
                  Direct Inquiries
                </div>
                <h2 className="text-xl font-bold text-white">How we engage with you</h2>
                <p className="text-xs text-charcoal-400 mt-1 leading-relaxed">
                  We review your technical requirements, assess complexity, and provide a transparent milestone roadmap with fixed deliverables.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-brand-500 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-charcoal-400">Direct Email</div>
                    <a
                      href="mailto:info@ethixweb.com"
                      className="text-sm font-medium text-white hover:text-brand-400 transition-colors"
                    >
                      info@ethixweb.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-brand-500 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-charcoal-400">WhatsApp / Helpline</div>
                    <span className="text-sm font-medium text-white font-mono">
                      +91 98200 11223
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-brand-500 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-charcoal-400">Engineering Hours</div>
                    <span className="text-xs text-charcoal-300">
                      Monday – Friday: 9:30 AM to 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-2 text-xs text-charcoal-400">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>24-Hour Technical Assessment SLA</span>
                </div>
                <p className="text-[11px] leading-relaxed text-charcoal-500">
                  All submissions are treated under strict mutual non-disclosure. We never share or sell client contact data.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <span>Learn why we started Ethixweb</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Refined Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
