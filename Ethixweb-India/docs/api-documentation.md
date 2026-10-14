# Ethixweb India - API Specification

Base URL: `http://localhost:5000/api`

## Security Overview
- **Helmet**: Enforces secure HTTP response headers.
- **CORS**: Configured with explicit origin whitelist and `credentials: true`.
- **Rate Limiting**:
  - `POST /api/auth/login`: 15 attempts / 15 minutes.
  - `POST /api/leads`: 20 submissions / 15 minutes.
- **Honeypot Protection**: Rejects submissions with `bot_trap` or hidden bot fields.
- **Request Size Limiting**: JSON payload capped at `100kb`.
- **Authentication**: JWT token issued in an `HttpOnly`, `SameSite=Lax` (or `Strict` in production) cookie (`token`), with Authorization Bearer header support.

---

## 1. System Health
- **`GET /api/health`**
  - **Access**: Public
  - **Response**: `{ status: "ok", service: "Ethixweb India Enterprise API", timestamp: string }`

---

## 2. Public Enquiry API
- **`POST /api/leads`**
  - **Access**: Public (Rate-Limited, Honeypot-Protected)
  - **Request Body**:
    ```json
    {
      "name": "Nikhil Mathur",
      "email": "nikhil@mathurlogistics.in",
      "phone": "+91 98200 11223",
      "company": "Mathur Global Freight",
      "service": "Web Applications & Dashboards",
      "message": "We want to build a fleet tracking and customer consignment dashboard.",
      "bot_trap": ""
    }
    ```
  - **Validation & Normalization Rules**:
    - `name`: 2 - 100 characters, trimmed.
    - `email`: valid format, lowercase, trimmed, max 150 characters.
    - `phone`: optional, max 30 characters.
    - `company`: optional, max 120 characters.
    - `service`: required, max 100 characters.
    - `message`: 5 - 3000 characters, trimmed.
    - `bot_trap`: must be empty. If filled, returns `400 Bad Request`.
    - Status is strictly normalized to `'new'` regardless of user input.
  - **Response (`201 Created`)**:
    ```json
    {
      "success": true,
      "message": "Your inquiry has been received successfully...",
      "lead": {
        "id": "6acf...",
        "name": "Nikhil Mathur",
        "email": "nikhil@mathurlogistics.in",
        "company": "Mathur Global Freight",
        "service": "Web Applications & Dashboards",
        "status": "new",
        "createdAt": "2026-10-14T..."
      }
    }
    ```

---

## 3. Administrator Authentication
- **`POST /api/auth/login`**
  - **Access**: Public (Rate-Limited)
  - **Request Body**: `{ "email": "admin@ethixweb.com", "password": "AdminPassword@123" }`
  - **Response (`200 OK`)**:
    - Sets `Set-Cookie: token=<jwt>; HttpOnly; Path=/; SameSite=Lax`
    - Returns JSON: `{ "success": true, "token": "<jwt>", "admin": { "id": "...", "name": "...", "email": "...", "role": "admin" } }`

- **`POST /api/auth/logout`**
  - **Access**: Public / Authenticated
  - **Response (`200 OK`)**: Clears `token` cookie (`Expires=Thu, 01 Jan 1970`).

- **`GET /api/auth/me`**
  - **Access**: Protected (Requires `token` HttpOnly cookie or Bearer token)
  - **Response (`200 OK`)**: `{ "success": true, "admin": { "id": "...", "name": "...", "email": "...", "role": "admin" } }`

---

## 4. Protected Admin CRM Endpoints
All endpoints below require authentication. Returns `401 Unauthorized` if unauthenticated.

- **`GET /api/admin/leads`**
  - **Query Parameters**:
    - `page` (default: 1)
    - `limit` (default: 50, max: 100)
    - `status` (`'all'`, `'new'`, `'contacted'`, `'qualified'`, `'converted'`, `'closed'`)
    - `search` (searches across name, email, phone, company, service, and message)
  - **Response (`200 OK`)**:
    ```json
    {
      "success": true,
      "leads": [ ... ],
      "pagination": { "total": 12, "page": 1, "limit": 50, "totalPages": 1 }
    }
    ```

- **`PATCH /api/admin/leads/:id`**
  - **Params**: `id` (must be a valid MongoDB ObjectId; returns `400` if malformed)
  - **Request Body**:
    ```json
    {
      "status": "contacted",
      "notes": "Discussed scope on phone. Contract sent."
    }
    ```
  - **Validation**: `status` must be one of `['new', 'contacted', 'qualified', 'converted', 'closed']`.
  - **Response (`200 OK`)**: `{ "success": true, "message": "Lead updated successfully.", "lead": { ... } }`

- **`DELETE /api/admin/leads/:id`**
  - **Params**: `id` (valid MongoDB ObjectId)
  - **Response (`200 OK`)**: `{ "success": true, "message": "Lead record deleted successfully." }`

- **`GET /api/admin/stats`**
  - **Response (`200 OK`)**:
    ```json
    {
      "success": true,
      "data": {
        "metrics": { "total": 12, "new": 4, "contacted": 3, "qualified": 2, "converted": 2, "closed": 1 },
        "serviceBreakdown": [ { "_id": "Web Applications & Dashboards", "count": 5 }, ... ],
        "recentLeads": [ ... ]
      }
    }
    ```
