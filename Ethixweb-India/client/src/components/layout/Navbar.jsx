import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Shield, LogOut } from 'lucide-react';
import authService from '../../services/authService';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [istTime, setIstTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  // Dynamic Indian Standard Time (IST) display (matching ethixweb.com signature element)
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
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-3.5 transition-all">
      <div className="max-w-7xl mx-auto rounded-2xl bg-charcoal-900/90 backdrop-blur-xl border border-charcoal-800/80 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between h-16 px-5 sm:px-6">
          {/* Authentic Ethixweb Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/ethixweb-logo-text.webp"
              alt="Ethixweb"
              width="150"
              height="24"
              className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                // Fallback to text & emblem if webp isn't loaded
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-2">
              <img src="/ethixweb.png" alt="Ethixweb Emblem" className="w-7 h-7 object-contain" />
              <span className="text-lg font-extrabold tracking-tight text-white">
                ETHIXWEB<span className="text-brand-500">.</span>
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-500/15 text-brand-400 border border-brand-500/30">
              India
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-charcoal-800/90 font-semibold shadow-inner'
                      : 'text-charcoal-300 hover:text-white hover:bg-charcoal-800/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Elements: Timezone & Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* IST Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-800/60 border border-charcoal-700/50 text-xs text-charcoal-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-[10px] bg-charcoal-700 px-1.5 py-0.5 rounded text-white tracking-wider">
                IST
              </span>
              <span className="tabular-nums font-mono text-charcoal-200">{istTime || '12:45 PM'}</span>
            </div>

            {/* Admin Quick Switch */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-charcoal-800 text-charcoal-200 hover:text-white border border-charcoal-700 hover:border-brand-500/50 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-500" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 text-charcoal-400 hover:text-red-400 hover:bg-charcoal-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="text-xs text-charcoal-400 hover:text-charcoal-200 px-2.5 py-1.5 transition-colors"
              >
                Portal
              </Link>
            )}

            {/* Primary CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/contact"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-500 hover:bg-brand-600"
            >
              Contact
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-charcoal-200 hover:bg-charcoal-800 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
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
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl text-xs font-bold text-center text-white bg-brand-500 uppercase tracking-wider"
            >
              Start A Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
