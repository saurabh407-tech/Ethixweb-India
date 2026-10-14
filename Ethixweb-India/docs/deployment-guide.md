# MongoDB Atlas & Deployment Guide

## 1. MongoDB Atlas Configuration

To connect this application to MongoDB Atlas in production or staging:

1. **Sign in to MongoDB Atlas**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in.
2. **Create or Select a Cluster**:
   - Create a free `M0 Sandbox` or dedicated production cluster (choose AWS or GCP region in India: e.g., `ap-south-1` Mumbai).
3. **Database Access (User Credentials)**:
   - Navigate to **Security > Database Access**.
   - Click **Add New Database User**.
   - Create a user (e.g. `ethixweb_admin`) with password authentication and `readWriteAnyDatabase` or specific database permissions.
4. **Network Access (IP Whitelist)**:
   - Navigate to **Security > Network Access**.
   - Click **Add IP Address**.
   - For local development, add your current IP address.
   - For cloud platforms (e.g., Render, Railway, Vercel Serverless), add `0.0.0.0/0` (Allow Access from Anywhere).
5. **Get Connection String**:
   - Click **Connect > Drivers (Node.js)**.
   - Copy the SRV URI:
     ```
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/ethixweb_india?retryWrites=true&w=majority
     ```
6. **Set Server Environment Variable**:
   - Place this URI in `server/.env`:
     ```env
     MONGODB_URI=mongodb+srv://ethixweb_admin:<your-password>@cluster0.mongodb.net/ethixweb_india?retryWrites=true&w=majority
     ```

---

## 2. One-Time Secure Administrator Initialization

Run the initialization script to seed the first administrator account into MongoDB Atlas:

```bash
cd server
npm run seed
```

This reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `server/.env` (or defaults to `admin@ethixweb.com` / `AdminPassword@123`), hashes the password using 10 bcrypt salt rounds, and registers the administrator. Public registration is permanently disabled.

---

## 3. Server Deployment (Node.js / Express)

- **Environment Variables**:
  - `PORT=5000`
  - `NODE_ENV=production`
  - `MONGODB_URI=mongodb+srv://<user>:<pwd>@cluster0.mongodb.net/ethixweb_india?retryWrites=true&w=majority`
  - `JWT_SECRET=<strong-random-32-byte-hex-string>`
  - `JWT_EXPIRES_IN=7d`
  - `CLIENT_URL=https://your-frontend-domain.com`
- **Start Command**: `npm start` (runs `node src/server.js`)

---

## 4. Frontend Deployment (Vite / React)

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**:
  - `VITE_API_BASE_URL=https://your-backend-api-domain.com/api`
