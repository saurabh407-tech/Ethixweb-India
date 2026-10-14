import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Shield, LogOut } from 'lucide-react';
import authService from '../../services/authService';
import { triggerParticleBurst } from '../../utils/particleEffect';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [istTime, setIstTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  // Dynamic Indian Standard Time (IST) display (signature Ethixweb element)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Top Brand Marquee Ticker (Signature Ethixweb Brand Element) */}
      <div className="bg-brand-600 text-[10px] sm:text-[11px] font-bold tracking-widest text-white/95 uppercase py-1 px-4 text-center select-none overflow-hidden border-b border-brand-700/50">
        <div className="inline-flex items-center gap-4 sm:gap-6 whitespace-nowrap overflow-x-auto no-scrollbar">
          <span>Remote-First</span>
          <span className="opacity-50">•</span>
          <span>India & US Clients</span>
          <span className="opacity-50">•</span>
          <span>Revenue Over Vanity Metrics</span>
          <span className="opacity-50">•</span>
          <span>Since 2020</span>
          <span className="opacity-50">•</span>
          <span>Senior-Led Team</span>
          <span className="opacity-50">•</span>
          <span>No Account Managers</span>
        </div>
      </div>

      <header className="sticky top-0 inset-x-0 z-50 px-3 sm:px-6 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto rounded-2xl bg-charcoal-900/95 backdrop-blur-xl border border-charcoal-800/80 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
            {/* Authentic Ethixweb Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src="/assets/ethixweb-logo-text.webp"
                alt="Ethixweb"
                width="140"
                height="22"
                decoding="async"
                fetchPriority="high"
                className="h-5 sm:h-6 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2">
                <img
                  src="/ethixweb.png"
                  alt="Ethixweb Emblem"
                  width="26"
                  height="26"
                  decoding="async"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-lg font-extrabold tracking-tight text-white">
                  ETHIXWEB<span className="text-brand-500">.</span>
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-500/15 text-brand-400 border border-brand-500/30">
                India
              </span>
            </Link>

            {/* Desktop Nav Links with Authentic Red Bottom Underline Indicator */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-white font-semibold' : 'text-charcoal-300 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-brand-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Header Elements: Timezone & Action CTA */}
            <div className="hidden lg:flex items-center gap-3.5">
              {/* IST Indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-950 border border-charcoal-800 text-[11px] text-charcoal-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-white">IN</span>
                <span className="tabular-nums font-mono text-charcoal-400">{istTime || '03:30 PM'}</span>
              </div>

              {/* Admin Quick Switch */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-charcoal-800 text-charcoal-200 hover:text-white border border-charcoal-700 hover:border-brand-500/50 transition-colors"
                  >
                    <Shield className="w-3 h-3 text-brand-500" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-1 text-charcoal-400 hover:text-red-400 hover:bg-charcoal-800 rounded-md transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-xs text-charcoal-400 hover:text-charcoal-200 px-2 py-1 transition-colors"
                >
                  Portal
                </Link>
              )}

              {/* Start a project primary CTA with Particle Burst Micro-interaction */}
              <Link
                to="/contact"
                onClick={triggerParticleBurst}
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-charcoal-950 bg-white hover:bg-brand-500 hover:text-white transition-all shadow-md active:scale-95 overflow-hidden"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-2.5">
              <Link
                to="/contact"
                onClick={triggerParticleBurst}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-charcoal-950 bg-white hover:bg-brand-500 hover:text-white"
              >
                Start a project
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-charcoal-300 hover:text-white hover:bg-charcoal-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-charcoal-900 border border-charcoal-800 shadow-2xl p-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-charcoal-800 font-semibold'
                      : 'text-charcoal-200 hover:bg-charcoal-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-charcoal-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-charcoal-800 text-charcoal-200 text-center"
                >
                  Admin CRM Dashboard
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-charcoal-400 text-center hover:text-white"
                >
                  Admin Portal Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
