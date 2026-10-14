# Architecture & Design Rationale

## Core Design Decisions

### 1. Separation of Concerns & Cleaner Layering
- **Client (React + Vite + Tailwind CSS)**: Pure presentation and interactive user flow. All styling utilizes utility-first Tailwind tokens for zero runtime overhead and swift mobile responsiveness.
- **Server (Node.js + Express + Mongoose)**: Decoupled into Controllers, Services, Models, and Middlewares. Controllers manage HTTP requests/responses, Services encapsulate business logic and DB queries, and Middlewares enforce cross-cutting concerns (authentication, rate limiting, error catching).

### 2. Security Best Practices
- **Password Protection**: Passwords are never stored in plaintext. `bcryptjs` salt rounds (10) hash passwords prior to persisting in MongoDB. The model marks `password: { select: false }` to prevent accidental leakage in user queries.
- **Stateless Authentication**: JWT tokens with 7-day expiration ensure scalable, stateless session verification.
- **DDoS / Spam Protection**: `express-rate-limit` prevents brute-force password guessing on `/api/auth/login` and submission abuse on public `/api/leads`.
- **Environment Isolation**: All database connection strings and JWT secrets remain strictly in backend `.env` files; the client only accesses the public `VITE_API_BASE_URL`.

### 3. Interview-Friendly Maintainability
- The code avoids overly complex abstractions (such as heavy ORMs or convoluted monorepo tooling) so that a junior/fresher developer can clearly explain every request cycle from button click to database document update.
