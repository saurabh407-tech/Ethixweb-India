import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { Admin } from '../models/Admin.js';

export const requireAuth = async (req, res, next) => {
  try {
    let token;

    // 1. Primary: Extract from HttpOnly Cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2. Fallback: Extract from Authorization Bearer header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Unauthorized: Access denied. Please sign in as an administrator.'));
    }

    const secret = process.env.JWT_SECRET || 'ethixweb_secure_jwt_secret_key_2026_dev';
    const decoded = jwt.verify(token, secret);

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return next(new ApiError(401, 'Unauthorized: Administrator account no longer exists.'));
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Session expired. Please sign in again.'));
    }
    return next(new ApiError(401, 'Invalid authentication token. Access denied.'));
  }
};
