import { Router } from 'express';
import {
  getAdminLeads,
  updateLeadStatus,
  deleteLead,
} from '../controllers/leadController.js';
import { getDashboardStats } from '../controllers/adminController.js';
import {
  validateLeadId,
  validateUpdateLeadStatusInput,
} from '../validators/leadValidator.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Protect ALL routes on this router
router.use(requireAuth);

// GET /api/admin/stats - Aggregated analytics
router.get('/stats', getDashboardStats);

// GET /api/admin/leads - Paginated inquiries with search & status filters
router.get('/leads', getAdminLeads);

// PATCH /api/admin/leads/:id - Update status and notes
router.patch('/leads/:id', validateLeadId, validateUpdateLeadStatusInput, updateLeadStatus);

// DELETE /api/admin/leads/:id - Delete lead record
router.delete('/leads/:id', validateLeadId, deleteLead);

export default router;
