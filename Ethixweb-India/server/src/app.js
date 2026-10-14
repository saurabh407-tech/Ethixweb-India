import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { ApiError } from './utils/ApiError.js';

const app = express();

// Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Dynamic CORS configuration supporting local dev, custom CLIENT_URL, and Vercel domains
const configuredClientUrl = process.env.CLIENT_URL;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Check configured CLIENT_URL
      if (configuredClientUrl && origin === configuredClientUrl.replace(/\/$/, '')) {
        return callback(null, true);
      }

      // Check localhost and local IP addresses
      if (
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.startsWith('http://192.168.')
      ) {
        return callback(null, true);
      }

      // Check Vercel deployed domains
      if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      // Check Render custom domains or subdomains
      if (/^https:\/\/.*\.onrender\.com$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new ApiError(403, `Origin ${origin} not permitted by CORS policy.`));
    },
    credentials: true, // Allow cookies and Authorization headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse cookies for HttpOnly JWT session authentication
app.use(cookieParser());

// Enforce request payload size limits (100kb) to prevent payload attacks
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Ethixweb India Enterprise API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Mount Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/admin', adminRoutes);

// Resilient fallback mounts if client omitted /api in VITE_API_BASE_URL
app.use('/auth', authRoutes);
app.use('/leads', leadRoutes);
app.use('/admin', adminRoutes);

// Catch-all 404 Route
app.use((req, res, next) => {
  next(new ApiError(404, `Endpoint ${req.originalUrl} not found on this server.`));
});

// Centralized Global Error Handler
app.use(errorHandler);

export default app;
