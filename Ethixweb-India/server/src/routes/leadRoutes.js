import { Router } from 'express';
import {
  createLead,
  getAdminLeads,
  updateLeadStatus,
  deleteLead,
} from '../controllers/leadController.js';
import {
  validateCreateLeadInput,
  validateLeadId,
  validateUpdateLeadStatusInput,
} from '../validators/leadValidator.js';
import { leadSubmissionLimiter } from '../middleware/rateLimitMiddleware.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public: POST /api/leads - Honeypot protected, rate-limited, strictly sanitized
router.post('/', leadSubmissionLimiter, validateCreateLeadInput, createLead);

// Protected Admin Fallbacks (also exposed under /api/admin/leads)
router.get('/', requireAuth, getAdminLeads);
router.patch('/:id', requireAuth, validateLeadId, validateUpdateLeadStatusInput, updateLeadStatus);
router.delete('/:id', requireAuth, validateLeadId, deleteLead);

export default router;
