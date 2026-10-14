import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-charcoal-300 pt-20 pb-12 border-t border-charcoal-850 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-charcoal-850">
          {/* Brand & Purpose */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block group">
              <img
                src="/assets/ethixweb-logo-text.webp"
                alt="Ethixweb"
                width="150"
                height="24"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2">
                <img src="/ethixweb.png" alt="Ethixweb" className="w-7 h-7 object-contain" />
                <span className="text-xl font-bold tracking-tight text-white">
                  ETHIXWEB<span className="text-brand-500">.</span>
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-400 leading-relaxed max-w-sm">
              We run the tech. You run the business. Partnering with Indian startups, SMEs, and modern enterprises to build dependable web applications, connected CRMs, and streamlined digital operations.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-charcoal-900 border border-charcoal-800 text-charcoal-300">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                Engineering for Indian & Global Growth
              </span>
            </div>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-charcoal-400 hover:text-white transition-colors">
                  Websites & Web Applications
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-charcoal-400 hover:text-white transition-colors">
                  AI Automation & Workflows
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-charcoal-400 hover:text-white transition-colors">
                  CRM & Systems Integration
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-charcoal-400 hover:text-white transition-colors">
                  Search & SEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-charcoal-400 hover:text-white transition-colors">
                  Ongoing Technical Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-charcoal-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-charcoal-400 hover:text-white transition-colors">
                  About Ethixweb
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-charcoal-400 hover:text-white transition-colors">
                  Full Service Catalog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-charcoal-400 hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-charcoal-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm text-charcoal-400">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:info@ethixweb.com" className="hover:text-white transition-colors">
                  info@ethixweb.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="text-charcoal-300">Mon - Fri: 9:30 AM - 6:30 PM IST</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
                <span>Serving growing companies across India and international markets.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} Ethixweb. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-charcoal-400 transition-colors">
              Privacy & Ethics
            </Link>
            <span>•</span>
            <Link to="/services" className="hover:text-charcoal-400 transition-colors">
              Operating Standard
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-charcoal-400 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
