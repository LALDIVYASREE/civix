# Backend for Public AI Assist (Auth)

## Setup

1. Copy `.env.example` to `.env` and fill `MONGODB_URI` and `JWT_SECRET`.
2. `npm install`
3. `npm run dev` or `npm start`

### API endpoints
- `POST /api/auth/signup`  { name, email, password }
- `POST /api/auth/login`   { email, password }
- `GET /api/auth/me`       (Requires `Authorization: Bearer <token>`)
