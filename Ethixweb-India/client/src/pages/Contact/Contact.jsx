import React, { useEffect } from 'react';
import { Mail, Clock, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import EnquiryForm from '../../components/forms/EnquiryForm';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact & Project Scoping | Ethixweb India';
  }, []);

  return (
    <div className="bg-charcoal-950 text-white min-h-screen">
      {/* Page Header */}
      <section className="py-20 sm:py-28 border-b border-charcoal-850 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-brand-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>Direct Technical Scoping</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Let's discuss your next digital milestone.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-charcoal-400 leading-relaxed">
            Whether you need a full-stack web application, an automated CRM workflow, or a performance-engineered website, our senior developers are ready to analyze your scope.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Channels */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels & Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                How We Engage
              </h2>
              <p className="text-sm text-charcoal-400 mt-2 leading-relaxed">
                We respect your time. Every submission is reviewed directly by an experienced full-stack engineer rather than a commissioned salesperson.
              </p>
            </div>

            <div className="space-y-4">
              {/* Direct Email */}
              <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-charcoal-950 border border-charcoal-800 text-brand-500 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Direct Communication</h3>
                </div>
                <p className="text-xs text-charcoal-400 leading-relaxed pl-12">
                  General Inquiries & RFPs:{' '}
                  <a
                    href="mailto:info@ethixweb.com"
                    className="text-brand-400 hover:text-brand-300 font-medium"
                  >
                    info@ethixweb.com
                  </a>
                </p>
              </div>

              {/* Working Hours */}
              <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-charcoal-950 border border-charcoal-800 text-brand-500 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Engineering Working Hours</h3>
                </div>
                <p className="text-xs text-charcoal-400 leading-relaxed pl-12">
                  Monday – Friday: 9:30 AM to 6:30 PM IST <br />
                  Emergency SLA monitoring active 24/7 for managed clients.
                </p>
              </div>

              {/* Scoping Expectations */}
              <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-300">
                  What Happens Next?
                </h4>
                <div className="space-y-2 text-xs text-charcoal-400">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>Technical feasibility review within 24 business hours.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>Introductory 20-minute architecture discovery video call.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>Written milestone breakdown with fixed deliverables and pricing.</span>
                  </div>
                </div>
              </div>

              {/* Privacy badge */}
              <div className="p-4 rounded-xl bg-charcoal-900/60 border border-charcoal-800 text-xs text-charcoal-400 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Non-disclosure: Your project details and proprietary logic remain strictly confidential.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm
              title="Project Scoping & Estimate Request"
              subtitle="Fill in your project context below. Our lead engineer will evaluate your requirements and contact you with a structured proposal."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
