import apiRequest from './api.js';

export const leadService = {
  /**
   * Public: Submit a project enquiry lead
   */
  async submitLead(payload) {
    return await apiRequest('/leads', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Admin: Get paginated leads with search and filter
   */
  async getLeads({ page = 1, limit = 50, status = 'all', search = '' } = {}) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      status,
      search,
    });
    return await apiRequest(`/admin/leads?${params.toString()}`);
  },

  /**
   * Admin: Update lead status or internal notes
   */
  async updateLead(id, data) {
    return await apiRequest(`/admin/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Admin: Delete lead document
   */
  async deleteLead(id) {
    return await apiRequest(`/admin/leads/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Admin: Get aggregated statistics
   */
  async getStats() {
    return await apiRequest('/admin/stats');
  },
};

export default leadService;
