import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import authService from '../../services/authService';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@ethixweb.com');
  const [password, setPassword] = useState('AdminPassword@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Portal Authentication | Ethixweb India';
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';

    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }

    return () => {
      if (robotsMeta) robotsMeta.content = 'index, follow';
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-charcoal-950 text-white">
      <div className="max-w-md w-full">
        {/* Card Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4 group">
            <img
              src="/assets/ethixweb-logo-text.webp"
              alt="Ethixweb"
              width="150"
              height="28"
              className="h-7 w-auto mx-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-charcoal-900 border border-charcoal-800 flex items-center justify-center text-brand-500 mx-auto shadow-lg mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin Operations Portal
          </h2>
          <p className="text-xs text-charcoal-400 mt-1.5">
            Authenticate to review client inquiries, CRM pipeline, and system metrics
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
              >
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-white text-sm focus:outline-none focus:border-brand-500/80 focus:ring-2 focus:ring-brand-500/30 transition-all placeholder-charcoal-600"
                  placeholder="admin@ethixweb.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-white text-sm focus:outline-none focus:border-brand-500/80 focus:ring-2 focus:ring-brand-500/30 transition-all placeholder-charcoal-600"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Token...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Review Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-charcoal-800 text-center">
            <span className="text-[11px] text-charcoal-500 block font-medium">
              Demo Credentials for Assessment Review:
            </span>
            <p className="text-xs text-charcoal-300 mt-1 font-mono bg-charcoal-950 py-1.5 px-3 rounded-lg border border-charcoal-800 inline-block">
              admin@ethixweb.com / AdminPassword@123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
