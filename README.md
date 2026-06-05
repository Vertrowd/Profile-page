# Login & Signup App with PostgreSQL

A full-stack authentication application built with React, Node.js/Express, and PostgreSQL.

## Features

- ✅ User registration (signup)
- ✅ User login with JWT authentication
- ✅ Protected dashboard
- ✅ Bcrypt password hashing
- ✅ Token-based authentication
- ✅ Responsive UI with React Router
- ✅ PostgreSQL database

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── App.jsx              (Main routing component)
│   │   ├── Login.jsx            (Login page)
│   │   ├── Signup.jsx           (Signup page)
│   │   ├── Dashboard.jsx        (Protected dashboard)
│   │   ├── Auth.css             (Auth components styling)
│   │   └── Dashboard.css        (Dashboard styling)
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js                (Express server)
│   ├── db.js                    (PostgreSQL connection)
│   ├── routes/
│   │   └── auth.js              (Authentication routes)
│   ├── middleware/
│   │   └── auth.js              (JWT verification middleware)
│   └── .env                     (Environment variables)
│
└── database/
    └── schema.sql               (Database schema)
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL and create a new database:
```bash
createdb login_app
```

2. Connect to your database and run the schema:
```bash
psql -U postgres -d login_app -f database/schema.sql
```

### 2. Environment Configuration

Update `server/.env` with your PostgreSQL credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=login_app

JWT_SECRET=your_jwt_secret_key_change_this_in_production

NODE_ENV=development
PORT=5000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

**Terminal 1 - Start the backend server:**
```bash
npm run server
```

The server will run on `http://localhost:5000`

**Terminal 2 - Start the frontend development server:**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup` - Register a new user
  - Body: `{ username, email, password, confirmPassword }`
  - Returns: `{ message, token, user }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ message, token, user }`

- `GET /api/auth/me` - Get current user (requires token)
  - Header: `Authorization: Bearer <token>`
  - Returns: `{ user }`

- `POST /api/auth/logout` - Logout (requires token)
  - Header: `Authorization: Bearer <token>`
  - Returns: `{ message }`

## Features Overview

### Signup Page (`/signup`)
- Username, email, and password input
- Password confirmation validation
- Form validation
- Auto-redirects to dashboard on successful signup

### Login Page (`/login`)
- Email and password input
- Form validation
- Auto-redirects to dashboard on successful login

### Dashboard (`/dashboard`)
- Protected route (requires JWT token)
- Displays user profile information
- Logout functionality
- Auto-redirects to login if not authenticated

## Security Features

- ✅ Passwords hashed with bcryptjs
- ✅ JWT token-based authentication
- ✅ Protected routes on frontend
- ✅ Token stored in localStorage
- ✅ CORS enabled for frontend-backend communication
- ✅ Input validation on client and server

## Technologies Used

### Frontend
- React 19
- React Router v6
- Axios (HTTP client)
- CSS3 for styling

### Backend
- Node.js with Express
- PostgreSQL with pg driver
- JWT (jsonwebtoken)
- Bcryptjs for password hashing
- CORS middleware
- dotenv for environment variables

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify credentials in `.env` file
- Check database exists: `psql -l`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Vite will auto-select next available port (usually 5174+)

### CORS Errors
- Ensure backend is running on port 5000
- Check frontend URL matches CORS configuration

### Token Expired
- JWT tokens expire in 7 days
- User needs to login again after expiration

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, GitHub)
- [ ] Two-factor authentication
- [ ] User profile update
- [ ] Refresh token rotation

---

**Happy Coding!** 🚀

