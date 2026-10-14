import { asyncHandler } from '../utils/asyncHandler.js';
import * as leadService from '../services/leadService.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Public Endpoint: Create new inquiry lead
 * Only accepts sanitized fields; ignores arbitrary status/admin fields
 */
export const createLead = asyncHandler(async (req, res) => {
  // Use sanitized data prepared by validateCreateLeadInput
  const sanitizedData = req.sanitizedLead || {
    name: req.body.name?.trim(),
    email: req.body.email?.trim().toLowerCase(),
    phone: req.body.phone?.trim() || '',
    company: req.body.company?.trim() || '',
    service: req.body.service?.trim(),
    message: req.body.message?.trim(),
    status: 'new',
  };

  const lead = await leadService.createNewLead(sanitizedData);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been received successfully. An engineering lead will contact you shortly.',
    lead: {
      id: lead._id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      service: lead.service,
      status: lead.status,
      createdAt: lead.createdAt,
    },
  });
});

/**
 * Admin Endpoint: Get paginated leads with search and filter
 */
export const getAdminLeads = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, status = 'all', search = '' } = req.query;
  const result = await leadService.getLeadsList({ page, limit, status, search });

  res.status(200).json({
    success: true,
    ...result,
  });
});

/**
 * Admin Endpoint: Update lead status and internal notes
 */
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const updateFields = {};
  if (status !== undefined) updateFields.status = status;
  if (notes !== undefined) updateFields.notes = notes;

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, 'Please provide status or notes to update.');
  }

  const updatedLead = await leadService.updateLeadById(id, updateFields);

  res.status(200).json({
    success: true,
    message: 'Lead updated successfully.',
    lead: updatedLead,
  });
});

/**
 * Admin Endpoint: Delete lead document
 */
export const deleteLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await leadService.deleteLeadById(id);

  res.status(200).json({
    success: true,
    message: 'Lead record deleted successfully.',
  });
});
