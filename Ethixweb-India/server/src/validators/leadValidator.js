import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { PERMITTED_STATUSES } from '../models/Lead.js';

export const validateCreateLeadInput = (req, res, next) => {
  // Honeypot check: If the hidden honeypot field is filled, silently reject or fail to stop spam bots
  if (req.body.honeypot || req.body.website_url_check || req.body.bot_trap) {
    return next(new ApiError(400, 'Invalid submission detected.'));
  }

  const { name, email, phone, company, service, message } = req.body;
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Full name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  } else if (name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Email validation
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email address is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Please enter a valid email address');
  } else if (email.trim().length > 150) {
    errors.push('Email cannot exceed 150 characters');
  }

  // Optional Phone validation
  if (phone && typeof phone === 'string' && phone.trim()) {
    if (phone.trim().length > 30) {
      errors.push('Phone number cannot exceed 30 characters');
    }
  }

  // Optional Company validation
  if (company && typeof company === 'string' && company.trim()) {
    if (company.trim().length > 120) {
      errors.push('Company name cannot exceed 120 characters');
    }
  }

  // Service validation
  if (!service || typeof service !== 'string' || !service.trim()) {
    errors.push('Service of interest is required');
  } else if (service.trim().length > 100) {
    errors.push('Service description cannot exceed 100 characters');
  }

  // Message validation
  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.push('Project scope or message is required');
  } else if (message.trim().length < 5) {
    errors.push('Message must be at least 5 characters');
  } else if (message.trim().length > 3000) {
    errors.push('Message cannot exceed 3000 characters');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join('. '), errors));
  }

  // Sanitize and normalize onto a clean sanitized object, explicitly dropping any public status or notes injection
  req.sanitizedLead = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : '',
    company: company ? company.trim() : '',
    service: service.trim(),
    message: message.trim(),
    status: 'new', // Public submissions ALWAYS default to 'new'
  };

  next();
};

export const validateLeadId = (req, res, next) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(400, `Invalid Lead ID format: ${id}`));
  }
  next();
};

export const validateUpdateLeadStatusInput = (req, res, next) => {
  const { status, notes } = req.body;

  if (status !== undefined) {
    if (!PERMITTED_STATUSES.includes(status)) {
      return next(
        new ApiError(
          400,
          `Invalid status '${status}'. Must be one of: ${PERMITTED_STATUSES.join(', ')}`
        )
      );
    }
  }

  if (notes !== undefined && typeof notes === 'string') {
    if (notes.length > 2000) {
      return next(new ApiError(400, 'Notes cannot exceed 2000 characters'));
    }
  }

  next();
};
