import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const isProduction = process.env.NODE_ENV === 'production';

// Cross-site cookie configuration for Vercel + Render
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction, // HTTPS required for sameSite: 'none' in production
  sameSite: isProduction ? 'none' : 'lax', // 'none' allows cross-origin requests between Vercel & Render
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'ethixweb_secure_jwt_secret_key_2026_dev';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id }, secret, { expiresIn });
};

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Please provide both email and password.');
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!admin) {
    throw new ApiError(401, 'Invalid credentials. Access denied.');
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials. Access denied.');
  }

  const token = generateToken(admin._id);

  // Set secure HttpOnly cookie
  res.cookie('token', token, COOKIE_OPTIONS);

  res.status(200).json({
    success: true,
    message: 'Authentication successful',
    token, // Also return in response payload for dual resilience (Bearer + Cookie)
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  // Clear the HttpOnly session cookie
  res.clearCookie('token', {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });

  res.status(200).json({
    success: true,
    message: 'Signed out successfully.',
  });
});

export const getCurrentAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
});
