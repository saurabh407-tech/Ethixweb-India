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
    tagline: 'Built for speed, conversion and durability',
    description:
      'Fast, modern websites engineered with React, Tailwind CSS, and clean semantic structures. Designed to establish trust and generate qualified business leads.',
    tags: ['React + Vite', 'Tailwind CSS', 'Mobile First', 'Core Web Vitals'],
  },
  {
    icon: Code2,
    title: 'Web Applications',
    tagline: 'Custom business logic and operational dashboards',
    description:
      'Tailored customer portals, internal workflow management software, and booking engines built to replace clumsy spreadsheets and fragmented tools.',
    tags: ['Node.js API', 'MongoDB / Mongoose', 'Role-Based Access', 'RESTful Services'],
  },
  {
    icon: Bot,
    title: 'AI Automation & Agents',
    tagline: 'Automated receptionists and smart pipelines',
    description:
      'Intelligent agents and workflow automations that qualify inbound leads, answer customer questions, and route inquiries directly to your team 24/7.',
    tags: ['Inbound Lead Routing', 'AI Receptionists', 'Workflow Automations', 'Trigger Hooks'],
  },
  {
    icon: Cable,
    title: 'CRM & Systems Integration',
    tagline: 'Unify tools into a single source of truth',
    description:
      'Seamless connections between your web forms, CRM (HubSpot, Zoho, GoHighLevel), WhatsApp Business API, and automated email notifications.',
    tags: ['CRM Webhooks', 'Zoho / HubSpot', 'WhatsApp API', 'Payment Gateways'],
  },
  {
    icon: Search,
    title: 'SEO & Search Visibility',
    tagline: 'Technical search optimization that compounds',
    description:
      'Structured schema markup, local search optimization across Indian commercial hubs, and performance audits that turn Google searchers into active inquiries.',
    tags: ['Technical SEO', 'Schema Markup', 'Performance Audits', 'Local SEO India'],
  },
  {
    icon: LifeBuoy,
    title: 'Maintenance & Support',
    tagline: 'Peace of mind with proactive monitoring',
    description:
      'Continuous uptime monitoring, security updates, database backups, and responsive engineering support so your team never worries about site health.',
    tags: ['Uptime Monitoring', 'Security Audits', 'Backup Protocols', 'Fast SLA Support'],
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-charcoal-900 border-y border-charcoal-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>Robust Digital Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Senior operators for the systems that grow the business.
          </h2>
          <p className="mt-4 text-base text-charcoal-400 leading-relaxed">
            We handle the full lifecycle of your digital operation so your leadership can focus on execution, clients, and market growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-charcoal-950/80 border border-charcoal-800 p-8 hover:border-brand-500/50 hover:bg-charcoal-950 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-charcoal-800 text-brand-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-500/30 group-hover:text-brand-500 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-500/90 mt-1 uppercase tracking-wider">
                    {s.tagline}
                  </p>
                  <p className="text-sm text-charcoal-400 mt-3.5 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-charcoal-850/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-charcoal-400 border border-charcoal-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-400 hover:text-brand-300 gap-1.5 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catalog Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-charcoal-950 border border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Need a customized digital architecture?</h4>
            <p className="text-xs text-charcoal-400 mt-0.5">
              We structure milestone-based development roadmaps tailored to your company's existing stack.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-charcoal-800 hover:bg-brand-500 hover:text-white border border-charcoal-700 transition-all shrink-0"
          >
            Request Architecture Review
          </Link>
        </div>
      </div>
    </section>
  );
}
