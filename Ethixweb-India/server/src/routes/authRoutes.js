import { Router } from 'express';
import { loginAdmin, logoutAdmin, getCurrentAdmin } from '../controllers/authController.js';
import { validateLoginInput } from '../validators/authValidator.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// POST /api/auth/login - Rate limited, validated, sets HttpOnly cookie
router.post('/login', authLimiter, validateLoginInput, loginAdmin);

// POST /api/auth/logout - Clears HttpOnly cookie
router.post('/logout', logoutAdmin);

// GET /api/auth/me - Protected route returning current admin profile
router.get('/me', requireAuth, getCurrentAdmin);

export default router;
