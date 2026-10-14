import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Trash2,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Building2,
  Layers,
  Loader2,
  Shield,
  Eye,
  FileText,
} from 'lucide-react';
import leadService from '../../services/leadService';
import authService from '../../services/authService';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modals state
  const [selectedLead, setSelectedLead] = useState(null); // Detail modal
  const [notesLead, setNotesLead] = useState(null); // Notes modal
  const [leadNotes, setLeadNotes] = useState('');
  const [updatingNotes, setUpdatingNotes] = useState(false);

  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    document.title = 'Admin CRM Dashboard | Ethixweb India';
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';

    return () => {
      if (robotsMeta) robotsMeta.content = 'index, follow';
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setActionError('');
    try {
      const [leadsRes, statsRes] = await Promise.all([
        leadService.getLeads({ status: filterStatus, search: searchQuery }),
        leadService.getStats(),
      ]);
      setLeads(leadsRes.leads || []);
      setStats(statsRes.data || null);
    } catch (err) {
      if (err.status === 401) {
        await authService.logout();
        navigate('/admin/login');
      } else {
        setActionError(err.message || 'Failed to fetch CRM records from MongoDB.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await leadService.updateLead(leadId, { status: newStatus });
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }
      setActionSuccess('Lead status updated successfully in MongoDB Atlas.');
      setTimeout(() => setActionSuccess(''), 3000);

      // Refresh aggregated metrics
      const statsRes = await leadService.getStats();
      setStats(statsRes.data || null);
    } catch (err) {
      setActionError(err.message || 'Failed to update status.');
    }
  };

  const handleDeleteLead = async (leadId, clientName) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the inquiry from "${clientName}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await leadService.deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l._id !== leadId));
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead(null);
      }
      setActionSuccess('Inquiry record deleted permanently.');
      setTimeout(() => setActionSuccess(''), 3000);

      const statsRes = await leadService.getStats();
      setStats(statsRes.data || null);
    } catch (err) {
      setActionError(err.message || 'Failed to delete lead from database.');
    }
  };

  const openNotesModal = (lead) => {
    setNotesLead(lead);
    setLeadNotes(lead.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!notesLead) return;
    setUpdatingNotes(true);
    try {
      await leadService.updateLead(notesLead._id, { notes: leadNotes });
      setLeads((prev) =>
        prev.map((l) => (l._id === notesLead._id ? { ...l, notes: leadNotes } : l))
      );
      if (selectedLead && selectedLead._id === notesLead._id) {
        setSelectedLead((prev) => ({ ...prev, notes: leadNotes }));
      }
      setNotesLead(null);
      setActionSuccess('Internal notes saved successfully.');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      setActionError(err.message || 'Failed to save notes.');
    } finally {
      setUpdatingNotes(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return 'bg-brand-500/20 text-brand-300 border-brand-500/40';
      case 'contacted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'qualified':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'converted':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'closed':
        return 'bg-charcoal-800 text-charcoal-400 border-charcoal-700';
      default:
        return 'bg-charcoal-800 text-charcoal-400 border-charcoal-700';
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-white pb-20">
      {/* Top Header */}
      <div className="bg-charcoal-900 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-charcoal-950 border border-charcoal-800 flex items-center justify-center text-brand-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Ethixweb Operations Console
              </h1>
              <p className="text-xs text-charcoal-400">
                Logged in as <span className="text-white font-medium">{currentUser?.name || 'Administrator'}</span> ({currentUser?.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-charcoal-800 bg-charcoal-950 text-xs font-semibold text-charcoal-300 hover:text-white hover:border-charcoal-700 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Action Alerts */}
        {actionError && (
          <div className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{actionError}</span>
            </div>
            <button onClick={() => setActionError('')} className="font-bold text-base px-2">×</button>
          </div>
        )}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-xs text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess('')} className="font-bold text-base px-2">×</button>
          </div>
        )}

        {/* Top Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-charcoal-900 p-5 rounded-2xl border border-charcoal-800">
              <div className="flex items-center justify-between text-charcoal-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Leads</span>
                <Users className="w-4 h-4 text-brand-500" />
              </div>
              <p className="text-3xl font-extrabold text-white">{stats.metrics?.total || 0}</p>
              <span className="text-[11px] text-charcoal-500 mt-1 block">Live MongoDB Atlas records</span>
            </div>

            <div className="bg-charcoal-900 p-5 rounded-2xl border border-charcoal-800">
              <div className="flex items-center justify-between text-charcoal-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">New Inquiries</span>
                <Clock className="w-4 h-4 text-brand-400" />
              </div>
              <p className="text-3xl font-extrabold text-brand-400">{stats.metrics?.new || 0}</p>
              <span className="text-[11px] text-charcoal-500 mt-1 block">Awaiting engineering review</span>
            </div>

            <div className="bg-charcoal-900 p-5 rounded-2xl border border-charcoal-800">
              <div className="flex items-center justify-between text-charcoal-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-3xl font-extrabold text-purple-400">
                {(stats.metrics?.contacted || 0) + (stats.metrics?.qualified || 0)}
              </p>
              <span className="text-[11px] text-charcoal-500 mt-1 block">Contacted & qualified</span>
            </div>

            <div className="bg-charcoal-900 p-5 rounded-2xl border border-charcoal-800">
              <div className="flex items-center justify-between text-charcoal-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Converted</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-emerald-400">{stats.metrics?.converted || 0}</p>
              <span className="text-[11px] text-charcoal-500 mt-1 block">Signed deliverables</span>
            </div>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-charcoal-900 p-4 rounded-2xl border border-charcoal-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {['all', 'new', 'contacted', 'qualified', 'converted', 'closed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors ${
                  filterStatus === st
                    ? 'bg-brand-500 text-white font-semibold'
                    : 'bg-charcoal-950 text-charcoal-400 hover:text-white border border-charcoal-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-500" />
              <input
                type="text"
                placeholder="Search name, email, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-charcoal-800 bg-charcoal-950 text-white focus:outline-none focus:border-brand-500/80 placeholder-charcoal-600"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-charcoal-800 text-white text-xs font-semibold hover:bg-charcoal-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Leads Table */}
        <div className="bg-charcoal-900 rounded-2xl border border-charcoal-800 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-charcoal-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Inquiries Pipeline (MongoDB Atlas)</h3>
            <span className="text-xs text-charcoal-400 font-medium font-mono">
              Showing {leads.length} entries
            </span>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-charcoal-400 gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
              <span className="text-xs font-mono">Querying database collection...</span>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center text-charcoal-500 text-sm">
              No inquiries found in this pipeline view.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal-950/80 text-[11px] font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-800">
                    <th className="py-3.5 px-6">Client / Company</th>
                    <th className="py-3.5 px-6">Service Area</th>
                    <th className="py-3.5 px-6">Project Scope</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-800 text-xs text-charcoal-300">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white text-sm">{lead.name}</div>
                        {lead.company && (
                          <div className="text-[11px] text-charcoal-400 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-brand-500 shrink-0" />
                            <span>{lead.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-charcoal-400 text-xs mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-charcoal-500" />
                            {lead.email}
                          </span>
                          {lead.phone && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-charcoal-500" />
                                {lead.phone}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-charcoal-950 text-brand-400 border border-charcoal-800">
                          {lead.service}
                        </span>
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <p className="truncate text-charcoal-300" title={lead.message}>
                          {lead.message || <span className="italic text-charcoal-500">None</span>}
                        </p>
                        {lead.notes && (
                          <div className="text-[11px] text-amber-400 font-medium mt-1 truncate">
                            Note: {lead.notes}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap text-charcoal-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${getStatusBadge(
                            lead.status
                          )} bg-charcoal-950 cursor-pointer`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg border border-charcoal-800 bg-charcoal-950 text-charcoal-300 hover:text-white text-xs font-medium"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openNotesModal(lead)}
                            className="p-1.5 rounded-lg border border-charcoal-800 bg-charcoal-950 text-charcoal-300 hover:text-white text-xs font-medium"
                            title="Edit Internal Notes"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead._id, lead.name)}
                            className="p-1.5 rounded-lg text-charcoal-500 hover:text-red-400 hover:bg-charcoal-950 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-charcoal-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-charcoal-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-charcoal-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-400">
                  Lead Details & Context
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedLead.name}</h3>
                {selectedLead.company && (
                  <p className="text-xs text-charcoal-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-500" />
                    <span>{selectedLead.company}</span>
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-charcoal-400 hover:text-white text-lg font-bold p-1"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800">
                  <span className="text-charcoal-500 block text-[10px] uppercase font-bold">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-white hover:text-brand-400 font-mono mt-0.5 block truncate">
                    {selectedLead.email}
                  </a>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800">
                  <span className="text-charcoal-500 block text-[10px] uppercase font-bold">Phone</span>
                  <span className="text-white font-mono mt-0.5 block">
                    {selectedLead.phone || 'Not provided'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800">
                <span className="text-charcoal-500 block text-[10px] uppercase font-bold">Service Required</span>
                <span className="text-brand-400 font-semibold mt-0.5 block text-sm">
                  {selectedLead.service}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1.5">
                <span className="text-charcoal-500 block text-[10px] uppercase font-bold">Project Scope / Requirements</span>
                <p className="text-charcoal-200 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>

              {selectedLead.notes && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900/60 space-y-1">
                  <span className="text-amber-400 block text-[10px] uppercase font-bold">Internal Engineering Notes</span>
                  <p className="text-amber-200 text-xs leading-relaxed">
                    {selectedLead.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-charcoal-500 text-xs">Pipeline Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead._id, e.target.value)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${getStatusBadge(
                      selectedLead.status
                    )} bg-charcoal-950`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <button
                  onClick={() => openNotesModal(selectedLead)}
                  className="px-3 py-1.5 rounded-xl border border-charcoal-700 bg-charcoal-800 text-charcoal-200 text-xs font-semibold hover:bg-charcoal-700"
                >
                  Edit Notes
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-800 flex justify-end gap-3">
              <button
                onClick={() => handleDeleteLead(selectedLead._id, selectedLead.name)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40"
              >
                Delete Lead
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-charcoal-800 text-white text-xs font-semibold hover:bg-charcoal-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Internal Notes Modal */}
      {notesLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-charcoal-900 rounded-3xl max-w-md w-full p-6 border border-charcoal-800 shadow-2xl">
            <h3 className="font-bold text-white text-base mb-1">
              Internal Scoping Notes: {notesLead.name}
            </h3>
            <p className="text-xs text-charcoal-400 mb-4">
              Add technical discovery notes, quotation details, or milestone timelines.
            </p>
            <textarea
              rows={4}
              value={leadNotes}
              onChange={(e) => setLeadNotes(e.target.value)}
              placeholder="e.g. Scoping call completed; proposed 3-week delivery milestone..."
              className="w-full p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-white text-xs focus:outline-none focus:border-brand-500 mb-4 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setNotesLead(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                disabled={updatingNotes}
                className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold disabled:opacity-60 flex items-center gap-1.5"
              >
                {updatingNotes && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{updatingNotes ? 'Saving...' : 'Save Notes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
