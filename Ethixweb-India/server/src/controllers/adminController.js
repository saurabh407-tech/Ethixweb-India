import { asyncHandler } from '../utils/asyncHandler.js';
import * as leadService from '../services/leadService.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await leadService.getLeadStatistics();

  res.status(200).json({
    success: true,
    data: stats,
  });
});
