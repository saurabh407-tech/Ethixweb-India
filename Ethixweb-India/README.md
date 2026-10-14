# Ethixweb India - Full Stack Web Application

A full-stack enterprise web portal and lead management system inspired by [Ethixweb](https://www.ethixweb.com/).

## Technology Stack
- **Client**: React 18, Vite, Tailwind CSS, React Router v6, Lucide Icons
- **Server**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB (Atlas compatible) & Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & BCrypt password hashing

## Architecture Overview
- `client/`: Single Page Application (SPA) with public marketing pages and protected admin dashboard.
- `server/`: REST API layer with controllers, services, models, validators, rate limiting, and centralized error handling.
- `docs/`: API specification, deployment guide, and architectural design rationale.

## Quick Start Guide

### 1. Configure Environment Variables
- Server: Copy `server/.env.example` to `server/.env`
- Client: Copy `client/.env.example` to `client/.env`

### 2. Install Dependencies
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Seed Database
Creates default administrator account and sample leads:
```bash
cd server
npm run seed
```
- **Admin Email**: `admin@ethixweb.com`
- **Admin Password**: `AdminPassword@123`

### 4. Run Development Servers
- Server: `npm run dev` in `server` (runs on http://localhost:5000)
- Client: `npm run dev` in `client` (runs on http://localhost:5173)

### 5. Run Automated Tests
```bash
cd server
npm test
```
Executes all 13 comprehensive backend security, validation, honeypot, authentication, and CRM workflow tests.

### 6. Production Build & Preview
```bash
cd client
npm run build
npm run preview
```

## Deployment Blueprints
- **Client (Vercel)**: Configured with `client/vercel.json` for SPA routing fallback. Set `VITE_API_BASE_URL` to your production Render API URL.
- **Server (Render)**: Configured with `render.yaml`. Set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL` environment variables.
- See detailed instructions in [docs/deployment-guide.md](docs/deployment-guide.md).
