import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Code2,
  Bot,
  Cable,
  Search,
  LifeBuoy,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import FinalCTA from '../../components/home/FinalCTA';

const DETAILED_SERVICES = [
  {
    id: 'websites',
    icon: Globe,
    title: 'Websites & Digital Portals',
    tagline: 'High-speed web platforms engineered for credibility and conversion',
    overview:
      'We design and build performant websites that give Indian startups and SMEs an authoritative digital footprint. Every site is crafted with clean semantics, modular components, and strict attention to mobile speed.',
    outcomes: [
      'Sub-second page loading speeds across Indian 4G/5G mobile connections',
      'Clear, accessible conversion funnels that guide visitors directly to inquiry forms',
      'Full responsiveness across all device viewports and screen densities',
      'Clean Git codebase delivered with zero vendor lock-in',
    ],
    deliverables: [
      'Custom React + Vite single-page application',
      'Tailwind CSS design token system',
      'Contact forms wired to secure backend APIs',
      'Cross-browser and mobile verification',
    ],
  },
  {
    id: 'web-apps',
    icon: Code2,
    title: 'Custom Web Applications & Portals',
    tagline: 'Operational tools and client dashboards tailored to your workflows',
    overview:
      'When spreadsheets and off-the-shelf software fail to match your business logic, we develop bespoke web applications—such as customer portals, internal workflow dashboards, and order tracking engines.',
    outcomes: [
      'Elimination of manual data entry errors and fragmented WhatsApp spreadsheets',
      'Secure role-based access control (RBAC) ensuring staff see only relevant data',
      'Reliable data persistence powered by scalable MongoDB document architecture',
      'Responsive interface accessible by operations teams in the office or on the move',
    ],
    deliverables: [
      'Custom Node.js & Express RESTful API backend',
      'Mongoose database schemas with index optimization',
      'Admin authentication and JWT session protection',
      'Live staging preview environment prior to cutover',
    ],
  },
  {
    id: 'ai-automation',
    icon: Bot,
    title: 'AI Automation & Workflow Pipelines',
    tagline: 'Intelligent inquiry routing and round-the-clock lead qualification',
    overview:
      'Customer inquiries often arrive outside normal office hours. We implement intelligent agents and webhook automation that capture, categorize, and route leads immediately so your team never misses an opportunity.',
    outcomes: [
      'Instant response to prospective client inquiries during weekends and evenings',
      'Pre-qualification of inbound leads based on your specific budget and criteria',
      'Automated email and webhook alerts dispatched directly to sales engineers',
      'Reduction in customer inquiry drop-off due to delayed initial contact',
    ],
    deliverables: [
      'Automated inquiry capture triggers',
      'Rule-based and LLM-assisted lead triage logic',
      'Notification dispatchers (email, webhook, CRM)',
      'Fallback logic ensuring human operator handover',
    ],
  },
  {
    id: 'crm-integrations',
    icon: Cable,
    title: 'CRM & Systems Integration',
    tagline: 'Unifying forms, databases, payment gateways, and communications',
    overview:
      'We link your frontend web applications with the tools your business already relies on—such as Zoho CRM, HubSpot, Razorpay, and communication APIs—creating an integrated operational pipeline.',
    outcomes: [
      'Single source of truth for customer records and inbound opportunities',
      'Automated sync between website inquiry forms and sales pipeline stages',
      'Secure transaction verification for Indian payment gateways and receipts',
      'Clean API documentation so any future developer can extend endpoints',
    ],
    deliverables: [
      'CRM webhook configuration and data mapping',
      'Webhook signature verification and error recovery',
      'Custom middleware for automated data transformation',
      'Postman / API collection documentation',
    ],
  },
  {
    id: 'seo-search',
    icon: Search,
    title: 'SEO & Search Visibility',
    tagline: 'Solid technical foundations for long-term organic discovery',
    overview:
      'Rather than relying on short-term SEO gimmicks, we implement rigorous technical search foundations—schema markup, metadata hierarchy, crawl efficiency, and Core Web Vitals optimization.',
    outcomes: [
      'Accurate rendering and indexing of your brand by Google and search engines',
      'Optimized Core Web Vitals metrics (LCP, FID, CLS) that support higher rankings',
      'Structured organization and local search tags for Indian commercial territories',
      'Clear organic traffic analytics and search console verification',
    ],
    deliverables: [
      'Schema.org JSON-LD microdata integration',
      'Dynamic OpenGraph and Twitter card metadata',
      'XML sitemap and robots.txt configuration',
      'Technical site performance audit report',
    ],
  },
  {
    id: 'maintenance',
    icon: LifeBuoy,
    title: 'Maintenance & Dedicated Support',
    tagline: 'Proactive monitoring, security patching, and dependable uptime care',
    overview:
      'A digital platform requires continuous care. We provide proactive monitoring, dependency updates, security auditing, and responsive engineering support to keep your applications running reliably.',
    outcomes: [
      'Early detection and resolution of server anomalies before they affect users',
      'Regular security updates protecting against dependency vulnerabilities',
      'Peace of mind knowing a dedicated technical team is available for fixes',
      'Predictable monthly operating costs with transparent service logs',
    ],
    deliverables: [
      '24/7 endpoint health check monitoring',
      'Automated database backup protocols',
      'Security patch application and vulnerability audits',
      'Priority ticket response SLA for critical issues',
    ],
  },
];

export default function Services() {
  useEffect(() => {
    document.title = 'Services & Digital Capabilities | Ethixweb India';
  }, []);

  return (
    <div className="bg-charcoal-950 text-white min-h-screen">
      {/* Page Header */}
      <section className="py-20 sm:py-28 border-b border-charcoal-850 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-brand-500/10 blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>Engineering & Digital Operations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Capabilities designed for measurable business utility.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-charcoal-400 leading-relaxed">
            We focus on practical, high-leverage technical capabilities that streamline operations, improve client acquisition, and stand the test of real-world use.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {DETAILED_SERVICES.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              id={srv.id}
              className="studio-card rounded-3xl p-8 sm:p-12 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Service Overview & Practical Outcomes */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-brand-500 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {srv.title}
                      </h2>
                      <span className="text-xs font-mono text-brand-400 block mt-0.5">
                        {srv.tagline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed">
                    {srv.overview}
                  </p>

                  {/* Measurable Outcomes for Indian Businesses */}
                  <div className="pt-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-500 mb-3 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" />
                      Practical Outcomes:
                    </h3>
                    <div className="space-y-2.5">
                      {srv.outcomes.map((out, oIdx) => (
                        <div key={oIdx} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Deliverables Box & CTA */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-400 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-500" />
                      Milestone Deliverables:
                    </h4>
                    <ul className="space-y-2.5">
                      {srv.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="text-xs text-charcoal-300 flex items-start gap-2">
                          <span className="text-brand-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/[0.06]">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/20 transition-all active:scale-95"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Final Call to Action */}
      <FinalCTA />
    </div>
  );
}
