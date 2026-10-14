# Ethixweb India — Digital Operations & Lead Management System

A production-grade full-stack web application designed for the Indian enterprise and SME ecosystem, inspired by and re-engineered from [Ethixweb](https://www.ethixweb.com/).

---

## 1. Project Overview & India-Specific Design Rationale

Ethixweb India addresses the digital transformation demands of Indian startups, SMEs, and mid-market enterprises. The application combines a high-performance marketing portal with an integrated lead management CRM and operations dashboard.

### India-Specific Engineering & Design Focus:
- **Network Resilience**: 77 KB gzipped client bundle and responsive lazy loading engineered for reliable performance across Tier-1 to Tier-3 4G/5G mobile connections.
- **Enterprise Palette**: Ethixweb's recognizable crimson red (`#E51D25`) paired with deep charcoal (`#0C0D10`) and warm off-white, moving away from low-contrast generic templates to an authoritative, accessible visual identity.
- **Grounded Narrative**: Realistic case studies tailored to the Indian ecosystem (e.g., GST invoice workflows, regional cold-chain fleet diagnostics, multi-lingual commerce) with zero inflated or fabricated claims.
- **Direct Engagement**: Clean, low-friction enquiry form with WhatsApp/direct call access alongside traditional asynchronous form submissions.

---

## 2. Improvements Over the Original Website

| Evaluation Vector | Original Ethixweb Site | Ethixweb India Re-Engineered |
| :--- | :--- | :--- |
| **Performance** | Multi-megabyte asset payloads with render-blocking styles | **77 KB JS bundle**, zero heavy animation libraries, non-blocking Google font loading, async image decoding. |
| **Lead Capture** | Standard form without automated persistence | **Real Express REST API** writing to MongoDB with automated status normalization and bot protection. |
| **Security & Spam** | Vulnerable to automated bot spamming | **Honeypot field (`bot_trap`)**, IP rate limiting (`express-rate-limit`), Helmet security headers, 100 KB payload ceiling. |
| **Admin Operations** | No public-facing CRM or visibility | **Protected Operations Dashboard** with real-time pipeline status management, lead search, notes editor, and metrics. |
| **Authentication** | Basic or absent session controls | **Bcrypt (10 salt rounds)** + **HttpOnly JWT cookies** with **Bearer token fallback** for cross-origin reliability. |
| **SEO & Discoverability** | Uncontrolled indexing | Explicit `robots.txt` and dynamic `noindex, nofollow` on all admin routes; clean OpenGraph and semantic HTML hierarchy. |

---

## 3. Technology Stack & Architecture

### Frontend (`client/`)
- **Core**: React 18 (SPA), Vite 6, React Router v6.
- **Styling**: Tailwind CSS with custom Ethixweb brand tokens and responsive typography.
- **Icons**: Lucide React (tree-shaken).
- **SEO & Security**: Dynamic document title management, robots meta tag toggles on admin routes, clean SPA routing fallback (`vercel.json`).

### Backend (`server/`)
- **Runtime**: Node.js (ES Modules), Express.js.
- **Database**: MongoDB (Atlas compatible) with Mongoose ODM.
- **Security Middleware**: Helmet, CORS with credential handling, Express Rate Limit, Cookie-Parser.
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) + Password Hashing (`bcryptjs`).

### Architecture Pattern
```
Ethixweb-India/
├── client/                     # Vite React SPA
│   ├── public/                 # Static brand assets, favicon, robots.txt
│   ├── src/
│   │   ├── components/         # Modular UI, forms, and layout components
│   │   ├── pages/              # Public pages (Home, Services, About, Contact) & Admin (Login, Dashboard)
│   │   └── services/           # API and Auth client abstraction layers
│   └── vercel.json             # SPA routing rewrite blueprint
├── server/                     # Express REST API
│   ├── scripts/                # Database seeders (seedAdmin.js)
│   └── src/
│       ├── controllers/        # Lead, Auth, and Admin business logic
│       ├── middleware/         # Auth verification, rate limiting, error handler
│       ├── models/             # Mongoose schemas (Lead.js, Admin.js)
│       ├── routes/             # Express route definitions
│       ├── tests/              # Comprehensive 13-test automated backend test suite
│       └── validators/         # Server-side input validation and honeypot checks
├── docs/                       # Architectural design rationale, API specs, deployment guide
└── render.yaml                 # Render cloud web service blueprint
```

---

## 4. Local Installation & Startup Commands

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- MongoDB instance (local or MongoDB Atlas connection URI)

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd Ethixweb-India
```

### Step 2: Configure Environment Files
Copy example configuration files into active `.env` files:
```bash
# Server configuration
cp Ethixweb-India/server/.env.example Ethixweb-India/server/.env

# Client configuration
cp Ethixweb-India/client/.env.example Ethixweb-India/client/.env
```

### Step 3: Install Dependencies
```bash
# Install server dependencies
cd Ethixweb-India/server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 4: Seed Database
Populate initial admin account and baseline pipeline leads:
```bash
cd ../server
npm run seed
```

### Step 5: Start Local Development Servers
```bash
# Terminal 1: Start Express API (runs on http://localhost:5000)
cd Ethixweb-India/server
npm run dev

# Terminal 2: Start Client Development Server (runs on http://localhost:5173)
cd Ethixweb-India/client
npm run dev
```

---

## 5. Required Environment Variables

Placeholders only — actual secrets must never be committed:

### Server Environment (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<db_user>:<db_password>@<cluster-url>/ethixweb_india?retryWrites=true&w=majority
JWT_SECRET=<strong-random-jwt-secret-minimum-32-characters>
CLIENT_URL=http://localhost:5173
```

### Client Environment (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 6. API Endpoints & Request/Response Behaviour

### Public Endpoints

#### `GET /api/health`
- **Description**: Health check and security headers verification.
- **Response**: `200 OK` `{ "status": "ok", "service": "ethixweb-api", "timestamp": "..." }`

#### `POST /api/leads`
- **Description**: Submit client project enquiry.
- **Protection**: Honeypot check (`bot_trap`), IP rate limited (10 requests per 15 min), field length validation.
- **Request Body**:
  ```json
  {
    "name": "Manish Tiwari",
    "email": "manish@tiwarilogistics.in",
    "phone": "+91 98200 11223",
    "company": "Tiwari Freight & Cargo",
    "service": "Custom Web Applications",
    "message": "Evaluating fleet tracking portal.",
    "bot_trap": ""
  }
  ```
- **Response**: `201 Created` `{ "success": true, "message": "...", "data": { ... } }`
- **Error States**: `400 Bad Request` if bot detected or validation fails.

#### `POST /api/auth/login`
- **Description**: Authenticate administrator.
- **Request Body**: `{ "email": "admin@ethixweb.com", "password": "..." }`
- **Response**: `200 OK` + `HttpOnly` session cookie (`SameSite=none/lax; Secure`) + JSON `{ "token": "...", "admin": { ... } }`.
- **Error States**: `401 Unauthorized` for invalid email or password.

---

### Protected Admin Endpoints
*Requires valid HttpOnly `token` cookie OR `Authorization: Bearer <token>` header.*

#### `GET /api/auth/me`
- **Description**: Returns authenticated administrator session profile.
- **Response**: `200 OK` `{ "success": true, "admin": { "id": "...", "email": "...", "name": "..." } }`

#### `POST /api/auth/logout`
- **Description**: Clears session cookie and invalidates state.
- **Response**: `200 OK` `{ "success": true, "message": "Logged out successfully" }`

#### `GET /api/admin/leads`
- **Description**: Query paginated leads with filtering by `status` and full-text `search`.
- **Parameters**: `?page=1&limit=10&status=new&search=Tiwari`
- **Response**: `200 OK` `{ "success": true, "total": 1, "page": 1, "leads": [ ... ] }`

#### `PATCH /api/admin/leads/:id`
- **Description**: Update lead pipeline status and internal notes.
- **Request Body**: `{ "status": "contacted", "notes": "Followed up via phone" }`
- **Response**: `200 OK` `{ "success": true, "lead": { ... } }`

#### `DELETE /api/admin/leads/:id`
- **Description**: Permanently delete lead document.
- **Response**: `200 OK` `{ "success": true, "message": "Lead permanently deleted" }`

#### `GET /api/admin/stats`
- **Description**: Aggregated CRM metrics.
- **Response**: `200 OK` `{ "success": true, "data": { "total": 10, "new": 4, "contacted": 3, "qualified": 2, "converted": 1 } }`

---

## 7. MongoDB Atlas Configuration

1. Create a free **M0 cluster** on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a user with read/write privileges to `ethixweb_india`.
3. Under **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere) to permit connections from Render and local development machines.
4. Under **Clusters** &rarr; **Connect** &rarr; **Connect your application**, copy the SRV connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/ethixweb_india?retryWrites=true&w=majority
   ```
5. Assign this string to `MONGODB_URI` in `server/.env` and Render environment variables.

---

## 8. Secure Admin Initialization

Run the dedicated seeding script:
```bash
cd Ethixweb-India/server
npm run seed
```
- Creates an admin record in the `admins` collection with Bcrypt hashing (10 salt rounds).
- Safe for repeated runs: idempotent check avoids duplicate records.
- **Default Seed Email**: `admin@ethixweb.com`
- **Default Seed Password**: `AdminPassword@123`

---

## 9. Deployment Steps

### A. Server Deployment on Render
1. Sign in to [Render](https://dashboard.render.com/) and create a **New Web Service**.
2. Connect your GitHub repository.
3. Set the following configuration:
   - **Root Directory**: `Ethixweb-India/server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Configure Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<your-mongodb-atlas-uri>`
   - `JWT_SECRET`: `<strong-random-32-char-secret>`
   - `CLIENT_URL`: `https://<your-vercel-frontend-domain>.vercel.app`
5. Click **Deploy Web Service**.

### B. Client Deployment on Vercel
1. Sign in to [Vercel](https://vercel.com/) and choose **Import Project**.
2. Select your repository.
3. Configure Build Settings:
   - **Root Directory**: `Ethixweb-India/client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://<your-render-backend-domain>.onrender.com/api`
5. Click **Deploy**. SPA routing fallback is automatically handled via [client/vercel.json](client/vercel.json).

---

## 10. Testing Instructions & Known Limitations

### Automated Testing
Run the comprehensive backend verification suite:
```bash
cd Ethixweb-India/server
npm test
```
All **13 tests pass**, covering health headers, honeypot rejections, validation errors, status normalization, auth barriers, session cookies, search/pagination, status changes, and document deletion.

### Production Build Verification
```bash
cd Ethixweb-India/client
npm run build
npm run preview
```
Verified: Bundle builds in 2.35s with 0 errors.

### Known Limitations
- Free tier hosting on Render suspends services after 15 minutes of inactivity; the initial cold-start request can take 30–50 seconds.
- Multi-factor authentication (MFA) is not implemented in this evaluation release (scoped to single-tenant admin authentication).

---

## 11. Live URL & Repository Status

- **GitHub Repository**: Prepared on local branch `main`, ready for remote connection.
- **Deployment Status**: All deployment artifacts ([render.yaml](render.yaml), [client/vercel.json](client/vercel.json), environment templates, CORS regex) are validated. Cloud hosting provider tokens were not pre-configured in this evaluation environment; see deployment section above to take the repository live.
