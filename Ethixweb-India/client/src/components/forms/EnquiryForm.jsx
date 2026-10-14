import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import leadService from '../../services/leadService';

const AVAILABLE_SERVICES = [
  'Websites & Digital Portals',
  'Web Applications & Dashboards',
  'AI Automation & Intelligent Workflows',
  'CRM & Systems Integration',
  'SEO & Search Visibility',
  'Maintenance & Dedicated Support',
];

export default function EnquiryForm({
  title = 'Start A Project Inquiry',
  subtitle = 'Tell us about your project requirements and tech stack. We will review your scope and provide an actionable architectural proposal.',
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: AVAILABLE_SERVICES[0],
    message: '',
    bot_trap: '', // Hidden honeypot field for bot mitigation
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverSuccess, setServerSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please provide your business email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (formData.phone.trim() && !/^[+0-9\s-]{7,30}$/.test(formData.phone.trim())) {
      errors.phone = 'Please provide a valid phone number (or leave blank).';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief summary of your project requirements.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Project description must be at least 5 characters long.';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerSuccess('');
    setServerError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        message: formData.message.trim(),
        bot_trap: formData.bot_trap, // Honeypot field sent to server
      };

      const res = await leadService.submitLead(payload);

      if (res.success) {
        setServerSuccess(
          res.message || 'Your inquiry has been successfully recorded in our CRM. An engineering lead will reach out shortly.'
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: AVAILABLE_SERVICES[0],
          message: '',
          bot_trap: '',
        });
        setFieldErrors({});
      } else {
        setServerError(res.message || 'Unable to process inquiry. Please try again.');
      }
    } catch (err) {
      setServerError(
        err.message || 'Could not connect to the backend server. Please verify network or try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          <span>Project Scoping</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-charcoal-400 mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Accessible Server Alert States */}
      {serverSuccess && (
        <div
          role="status"
          className="mb-8 p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-sm flex items-start gap-3.5"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-white">Inquiry Recorded</span>
            <span className="text-xs text-emerald-300 leading-relaxed">{serverSuccess}</span>
          </div>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mb-8 p-5 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-200 text-sm flex items-start gap-3.5"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-white">Submission Issue</span>
            <span className="text-xs text-red-300 leading-relaxed">{serverError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          name="bot_trap"
          value={formData.bot_trap}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none', position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="enquiry-name"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
            >
              Full Name <span className="text-brand-500">*</span>
            </label>
            <input
              id="enquiry-name"
              name="name"
              type="text"
              required
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Vikram Sharma"
              className={`w-full px-4 py-3 rounded-xl bg-charcoal-950 border text-sm text-white placeholder-charcoal-600 focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.name
                  ? 'border-brand-500 focus:ring-brand-500'
                  : 'border-charcoal-800 focus:border-brand-500/80 focus:ring-brand-500/30'
              }`}
            />
            {fieldErrors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-brand-400">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label
              htmlFor="enquiry-email"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
            >
              Business Email <span className="text-brand-500">*</span>
            </label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              required
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. vikram@startup.in"
              className={`w-full px-4 py-3 rounded-xl bg-charcoal-950 border text-sm text-white placeholder-charcoal-600 focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.email
                  ? 'border-brand-500 focus:ring-brand-500'
                  : 'border-charcoal-800 focus:border-brand-500/80 focus:ring-brand-500/30'
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-brand-400">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone (Optional) */}
          <div>
            <label
              htmlFor="enquiry-phone"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
            >
              Phone / WhatsApp <span className="text-charcoal-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              className={`w-full px-4 py-3 rounded-xl bg-charcoal-950 border text-sm text-white placeholder-charcoal-600 focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.phone
                  ? 'border-brand-500 focus:ring-brand-500'
                  : 'border-charcoal-800 focus:border-brand-500/80 focus:ring-brand-500/30'
              }`}
            />
            {fieldErrors.phone && (
              <p id="phone-error" className="mt-1.5 text-xs text-brand-400">
                {fieldErrors.phone}
              </p>
            )}
          </div>

          {/* Company / Brand (Optional) */}
          <div>
            <label
              htmlFor="enquiry-company"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
            >
              Company / Venture <span className="text-charcoal-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="enquiry-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Tech Solutions"
              className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-sm text-white placeholder-charcoal-600 focus:outline-none focus:border-brand-500/80 focus:ring-2 focus:ring-brand-500/30 transition-all"
            />
          </div>
        </div>

        {/* Service Interest */}
        <div>
          <label
            htmlFor="enquiry-service"
            className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
          >
            Service Interest <span className="text-brand-500">*</span>
          </label>
          <select
            id="enquiry-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-sm text-white focus:outline-none focus:border-brand-500/80 focus:ring-2 focus:ring-brand-500/30 transition-all cursor-pointer"
          >
            {AVAILABLE_SERVICES.map((srv) => (
              <option key={srv} value={srv} className="bg-charcoal-900 text-white">
                {srv}
              </option>
            ))}
          </select>
        </div>

        {/* Project Message / Requirements */}
        <div>
          <label
            htmlFor="enquiry-message"
            className="block text-xs font-bold uppercase tracking-wider text-charcoal-300 mb-2"
          >
            Project Scope or Requirements <span className="text-brand-500">*</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={4}
            required
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            value={formData.message}
            onChange={handleChange}
            placeholder="Outline your timeline, goals, or existing technical stack..."
            className={`w-full px-4 py-3 rounded-xl bg-charcoal-950 border text-sm text-white placeholder-charcoal-600 focus:outline-none focus:ring-2 transition-all resize-none ${
              fieldErrors.message
                ? 'border-brand-500 focus:ring-brand-500'
                : 'border-charcoal-800 focus:border-brand-500/80 focus:ring-brand-500/30'
            }`}
          />
          {fieldErrors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-brand-400">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Recording to Database...</span>
            </>
          ) : (
            <>
              <span>Submit Project Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[11px] text-charcoal-500 text-center pt-2">
          Directly writes to our secure MongoDB Atlas CRM. We never sell contact information.
        </p>
      </form>
    </div>
  );
}
