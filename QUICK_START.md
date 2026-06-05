## 🚀 Quick Start Guide

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running on your system
# Default: mongodb://localhost:27017/login-page
```

**Option B: MongoDB Atlas (Recommended)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/login-page?retryWrites=true&w=majority
```

### Step 3: Configure Environment
Update `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/login-page
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
npm run server
```
Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Expected output:
```
VITE v8.0.12  ready in 123 ms
➜  Local:   http://localhost:5173/
```

### Step 5: Test the Application

1. Open http://localhost:5173 in your browser
2. **Sign Up**: Click "Sign Up", fill form, optionally upload image
3. **Dashboard**: View profile, edit information, update/delete image
4. **Login**: Use credentials to login

## 📋 Available Commands

```bash
# Install dependencies
npm install

# Start development frontend
npm run dev

# Start backend server
npm run server

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## ✅ Features to Try

### 1. Sign Up with Image
- Fill username, email, password
- Click "Profile Image" and select an image
- See preview before upload
- Click "Sign Up"

### 2. Edit Profile on Dashboard
- Click "Edit Profile" button
- Fill First Name, Last Name, Bio, Phone
- Click "Save Changes"
- Or "Cancel" to discard changes

### 3. Update Profile Image
- In Dashboard, select new image
- Click "Upload New Image"
- Old image automatically deleted

### 4. Delete Profile Image
- Click "Delete Image" button
- Image removed from profile

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check connection string in .env |
| Port 5000 already in use | Change PORT in .env or kill process |
| Uploads directory missing | Restart server (auto-creates) |
| Image not updating | Check browser cache, do hard refresh |
| Token expired | Logout and login again |
| CORS error | Check CLIENT_URL in .env |

## 📂 Important Files Modified

✅ **Backend**
- `server/db.js` - MongoDB connection
- `server/server.js` - Express setup with static file serving
- `server/routes/auth.js` - Auth with image upload
- `server/routes/user.js` - Profile management routes
- `server/middleware/auth.js` - JWT verification
- `server/middleware/upload.js` - Multer configuration
- `server/models/User.js` - MongoDB schema (NEW)

✅ **Frontend**
- `src/Signup.jsx` - Image upload in signup
- `src/Dashboard.jsx` - Profile editing & image management
- `src/Auth.css` - Image upload styles
- `src/Dashboard.css` - Profile editor styles

✅ **Config**
- `.env` - MongoDB URI added
- `package.json` - Dependencies updated

## 📚 Additional Resources

- MongoDB Docs: https://docs.mongodb.com
- Mongoose Docs: https://mongoosejs.com
- JWT: https://jwt.io
- Express Multer: https://github.com/expressjs/multer

## 🎯 Next Steps

1. ✅ Run the application
2. ✅ Test all features
3. ✅ Check MongoDB collections in MongoDB Compass
4. ✅ Review uploaded images in `server/uploads/`
5. ✅ For production: Use cloud storage for images

---
Happy coding! 🚀
