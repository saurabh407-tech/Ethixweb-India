import mongoose from 'mongoose';

export const PERMITTED_SERVICES = [
  'Websites & Digital Portals',
  'Web Applications & Dashboards',
  'AI Automation & Intelligent Workflows',
  'CRM & Systems Integration',
  'SEO & Search Visibility',
  'Maintenance & Dedicated Support',
  'Custom Web Development',
  'Other / Enterprise Inquiries',
];

export const PERMITTED_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'closed'];

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
      maxlength: [150, 'Email cannot exceed 150 characters'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, 'Phone number cannot exceed 30 characters'],
      default: '',
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters'],
      default: '',
    },
    service: {
      type: String,
      required: [true, 'Service interest is required'],
      trim: true,
      maxlength: [100, 'Service name cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message / project scope is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters'],
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: PERMITTED_STATUSES,
        message: 'Invalid status value. Must be one of: new, contacted, qualified, converted, closed',
      },
      default: 'new',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for status filtering and reverse chronological ordering
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1 });

export const Lead = mongoose.model('Lead', leadSchema);
