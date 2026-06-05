# Login Page with MongoDB - Complete Guide

This is a full-stack authentication application with MongoDB integration, profile editing, and image upload capabilities.

## 🚀 Features

✅ **User Authentication**
- Sign up with email and username
- Login with email and password
- JWT token-based authentication

✅ **Image Upload**
- Upload profile image during signup
- Update profile image on dashboard
- Delete profile image
- Image preview before upload
- 5MB file size limit
- Supported formats: JPEG, PNG, GIF, WebP

✅ **Profile Management**
- View profile information
- Edit profile (First Name, Last Name, Bio, Phone)
- Update profile image anytime
- View account creation date

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud connection)
- npm or yarn

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

Update the `.env` file with your MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017/login-page
```

For **MongoDB Atlas** (cloud):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/login-page?retryWrites=true&w=majority
```

### 3. Environment Variables

Create or update `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/login-page
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Start the Application

**Terminal 1 - Start Backend Server:**
```bash
npm run server
```

**Terminal 2 - Start Frontend Dev Server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📊 MongoDB Schema

### User Collection

```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required, lowercase),
  password: String (hashed, required),
  profileImage: String (URL path or null),
  bio: String (default: ''),
  firstName: String (default: ''),
  lastName: String (default: ''),
  phone: String (default: ''),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### Sign Up with Image Upload
```
POST /api/auth/signup
- Content-Type: multipart/form-data
- Body:
  - username: string
  - email: string
  - password: string (min 6 chars)
  - confirmPassword: string
  - profileImage: file (optional, max 5MB)
```

#### Login
```
POST /api/auth/login
- Body:
  - email: string
  - password: string
```

#### Get Current User
```
GET /api/auth/me
- Headers: Authorization: Bearer <token>
```

#### Logout
```
POST /api/auth/logout
- Headers: Authorization: Bearer <token>
```

### User Profile Routes (`/api/user`)

#### Get User Profile
```
GET /api/user/profile
- Headers: Authorization: Bearer <token>
```

#### Update Profile Information
```
PUT /api/user/profile
- Headers: Authorization: Bearer <token>
- Body:
  - firstName: string
  - lastName: string
  - bio: string
  - phone: string
```

#### Update Profile Image
```
PUT /api/user/profile-image
- Headers: Authorization: Bearer <token>
- Content-Type: multipart/form-data
- Body:
  - profileImage: file (max 5MB)
```

#### Delete Profile Image
```
DELETE /api/user/profile-image
- Headers: Authorization: Bearer <token>
```

## 🎨 Frontend Components

### Signup Component (`src/Signup.jsx`)
- Form validation
- Real-time error messages
- Image upload with preview
- Form state management

### Dashboard Component (`src/Dashboard.jsx`)
- Display user profile
- Profile image display with fallback
- Edit profile form
- Image upload functionality
- Profile information display

## 📁 Project Structure

```
login-page/
├── server/
│   ├── models/
│   │   └── User.js              # MongoDB User schema
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── upload.js            # Multer configuration
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   └── user.js              # Profile endpoints
│   ├── uploads/                 # Uploaded images directory
│   ├── db.js                    # MongoDB connection
│   └── server.js                # Express server setup
├── src/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Auth.css
│   ├── Dashboard.css
│   └── index.css
├── .env
├── package.json
└── README.md
```

## 🔐 Security Features

- Passwords are hashed using bcryptjs (10 rounds)
- JWT tokens with 7-day expiration
- CORS enabled for secure cross-origin requests
- Image file type validation
- File size limit (5MB)
- SQL injection prevention (using MongoDB)

## 🖼️ Image Upload

- **Location**: `server/uploads/`
- **Access**: `http://localhost:5000/uploads/<filename>`
- **Max Size**: 5MB
- **Formats**: JPEG, PNG, GIF, WebP
- **Auto Cleanup**: Old images are deleted when new ones are uploaded

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check your connection string
- For MongoDB Atlas, whitelist your IP address
- Check username and password in connection string

### Image Upload Not Working
- Ensure `server/uploads/` directory exists (auto-created)
- Check file size (max 5MB)
- Verify file format is supported
- Check server logs for multer errors

### Token Expired
- Clear localStorage and login again
- Token expires after 7 days by default

### Port Already in Use
- Change PORT in `.env`
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- multer: File upload handling
- cors: Cross-origin resource sharing
- dotenv: Environment variables

### Frontend
- react: UI library
- react-router-dom: Routing
- axios: HTTP client

## 🚢 Deployment

### Prepare for Production

1. Update `.env`:
```env
NODE_ENV=production
JWT_SECRET=<generate-a-strong-secret>
MONGO_URI=<production-mongodb-uri>
CLIENT_URL=<production-domain>
```

2. Build frontend:
```bash
npm run build
```

3. Deploy to platforms like:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

## 📝 Notes

- All timestamps are in UTC
- Images are stored on the server filesystem
- For production, consider using cloud storage (AWS S3, Azure Blob, etc.)
- Implement rate limiting for security
- Add email verification in production

## 🤝 Contributing

Feel free to fork and create pull requests!

## 📄 License

MIT License
