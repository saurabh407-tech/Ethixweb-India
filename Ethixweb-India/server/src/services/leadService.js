import mongoose from 'mongoose';
import { Lead } from '../models/Lead.js';
import { ApiError } from '../utils/ApiError.js';

export const createNewLead = async (leadData) => {
  const lead = await Lead.create(leadData);
  return lead;
};

export const getLeadsList = async ({ page = 1, limit = 50, status, search }) => {
  const query = {};

  if (status && status !== 'all') {
    query.status = status;
  }

  if (search && typeof search === 'string' && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
      { company: searchRegex },
      { service: searchRegex },
      { message: searchRegex },
    ];
  }

  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (parsedPage - 1) * parsedLimit;

  const total = await Lead.countDocuments(query);
  const leads = await Lead.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parsedLimit);

  return {
    leads,
    pagination: {
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit) || 1,
    },
  };
};

export const updateLeadById = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid Lead ID: ${id}`);
  }

  const lead = await Lead.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    throw new ApiError(404, 'Lead not found in the database.');
  }

  return lead;
};

export const deleteLeadById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid Lead ID: ${id}`);
  }

  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) {
    throw new ApiError(404, 'Lead not found in the database.');
  }

  return lead;
};

export const getLeadStatistics = async () => {
  const [total, newCount, contacted, qualified, converted, closed] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'new' }),
    Lead.countDocuments({ status: 'contacted' }),
    Lead.countDocuments({ status: 'qualified' }),
    Lead.countDocuments({ status: 'converted' }),
    Lead.countDocuments({ status: 'closed' }),
  ]);

  // Aggregate count by service
  const serviceBreakdown = await Lead.aggregate([
    { $group: { _id: '$service', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Retrieve 5 most recent leads
  const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

  return {
    metrics: {
      total,
      new: newCount,
      contacted,
      qualified,
      converted,
      closed,
    },
    serviceBreakdown,
    recentLeads,
  };
};
