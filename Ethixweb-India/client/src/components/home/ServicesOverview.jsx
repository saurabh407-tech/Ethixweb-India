import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Code2,
  Bot,
  Cable,
  Search,
  LifeBuoy,
  ArrowUpRight,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Globe,
    title: 'Websites & Digital Portals',
    tagline: 'High Conversion & Speed',
    description:
      'Fast, modern web platforms engineered with React and modern typography. Designed to establish trust and turn visitors into qualified leads.',
    tags: ['React 18', 'Core Web Vitals', 'Responsive'],
  },
  {
    icon: Code2,
    title: 'Custom Web Applications',
    tagline: 'Internal Tools & Portals',
    description:
      'Tailored customer dashboards, internal operations software, and booking engines built to replace clumsy spreadsheets.',
    tags: ['Node.js API', 'MongoDB Atlas', 'Role Access'],
  },
  {
    icon: Bot,
    title: 'AI Automation & Workflows',
    tagline: 'Autonomous Pipelines',
    description:
      'Smart agents and background workflows that qualify inbound leads, send instant alerts, and route inquiries 24/7.',
    tags: ['Lead Qualification', 'Event Hooks', 'Instant Alerts'],
  },
  {
    icon: Cable,
    title: 'CRM & Systems Integration',
    tagline: 'Unified Operations',
    description:
      'Reliable connections between your web forms, CRM (HubSpot, Zoho), WhatsApp Business API, and automated email notifications.',
    tags: ['WhatsApp API', 'Zoho / HubSpot', 'RESTful API'],
  },
  {
    icon: Search,
    title: 'Technical Search & Discovery',
    tagline: 'Organic Search Compounding',
    description:
      'Clean JSON-LD schema markup, programmatic pages, and deep performance audits that drive qualified Indian commercial traffic.',
    tags: ['Structured Schema', 'Lighthouse 95+', 'Local SEO'],
  },
  {
    icon: LifeBuoy,
    title: 'Dedicated SLA & Support',
    tagline: 'Proactive Maintenance',
    description:
      'Continuous uptime monitoring, security patches, automated backups, and direct engineer support with no account-manager delays.',
    tags: ['24/7 Monitoring', 'Security Patches', 'Direct SLA'],
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brand-500 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            <span>Digital Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineering tailored for scale.
          </h2>
          <p className="mt-3 text-sm text-charcoal-400 leading-relaxed">
            We build and maintain durable software so founders and leadership can focus on execution without technical debt.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="studio-card rounded-3xl p-7 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-brand-500 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-brand-500/40 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-brand-500/90 mt-1 uppercase tracking-wider">
                    {s.tagline}
                  </p>
                  <p className="text-xs text-charcoal-400 mt-3 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-charcoal-400 border border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-xs font-semibold text-charcoal-300 group-hover:text-white gap-1.5 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catalog Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl studio-card flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h4 className="text-base font-bold text-white">Need a customized digital architecture?</h4>
            <p className="text-xs text-charcoal-400 mt-1">
              We analyze your operational needs and deliver fixed-milestone technical proposals within 24 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/[0.06] hover:bg-brand-500 hover:text-white border border-white/[0.1] hover:border-brand-500 shadow-lg transition-all shrink-0 active:scale-95 cursor-pointer"
          >
            Request Architecture Review
          </Link>
        </div>
      </div>
    </section>
  );
}
