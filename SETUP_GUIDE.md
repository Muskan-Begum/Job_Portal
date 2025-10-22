# 🚀 Job Portal - Complete Setup Guide

## Quick Start (Recommended)

### 1. Automatic Setup
```bash
# Run the setup script to install all dependencies
setup.bat

# Start both servers simultaneously
start-all.bat
```

### 2. Manual Setup

#### Backend Setup
```bash
cd Job-portal/backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd Job-portal/frontend
npm install
npm run dev
```

## 🔧 Environment Configuration

### 1. Backend Environment Variables
Copy `.env.example` to `.env` in the backend folder and update:

```env
# Required - MongoDB Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal

# Required - JWT Secret
SECRET_KEY=your-secure-jwt-secret-key

# Required - Cloudinary (for file uploads)
CLOUD_NAME=your-cloudinary-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret

# Optional - Email notifications
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password

# Optional - Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Get Required Services

#### MongoDB Atlas (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

#### Cloudinary (Free)
1. Go to [Cloudinary](https://cloudinary.com)
2. Create free account
3. Get API credentials from dashboard
4. Update `CLOUD_NAME`, `API_KEY`, `API_SECRET` in `.env`

#### Gmail App Password (Optional)
1. Enable 2-factor authentication on Gmail
2. Generate app-specific password
3. Update `EMAIL_USER` and `EMAIL_PASS` in `.env`

## 🎯 Features Overview

### ✅ Core Features
- **Authentication**: JWT + Google OAuth
- **Job Management**: Post, search, filter jobs
- **Applications**: Apply, track status
- **User Profiles**: Resume upload, skills
- **Admin Dashboard**: Analytics, job management
- **Email Notifications**: Application updates
- **Dark/Light Theme**: Persistent theme toggle
- **Responsive Design**: Mobile-first approach

### 🔐 User Roles
- **Student**: Browse jobs, apply, track applications
- **Recruiter**: Post jobs, manage applications
- **Admin**: Full system access, analytics

### 📊 Advanced Features
- **AI Job Recommendations**: Personalized matching
- **Real-time Notifications**: Application updates
- **Advanced Search**: Multi-criteria filtering
- **Application Tracking**: Timeline with status
- **Resume Parser**: Extract skills from resume
- **Analytics Dashboard**: Interactive charts

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/v1

## 📱 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/google-auth` - Google OAuth
- `GET /api/v1/user/logout` - User logout

### Jobs
- `GET /api/v1/job/get` - Get all jobs with filters
- `POST /api/v1/job/post` - Create new job (Recruiter)
- `GET /api/v1/job/:id` - Get job details

### Applications
- `POST /api/v1/application/apply/:id` - Apply for job
- `GET /api/v1/application/get` - Get user applications
- `PUT /api/v1/application/status/update/:id` - Update status

### Companies
- `GET /api/v1/company/get` - Get all companies
- `POST /api/v1/company/register` - Register company
- `PUT /api/v1/company/update/:id` - Update company

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Redux Toolkit
- Tailwind CSS
- Framer Motion
- Radix UI

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary
- Nodemailer

## 🚀 Deployment

### Backend (Railway/Heroku)
1. Set all environment variables
2. Deploy from GitHub
3. Update CORS origins

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Update API endpoints

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MONGO_URI format
   - Ensure IP whitelist in MongoDB Atlas

2. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits

3. **Email Not Working**
   - Use Gmail app password, not regular password
   - Enable 2-factor authentication

4. **CORS Errors**
   - Check frontend URL in backend CORS config
   - Ensure credentials: true in requests

### Development Tips

- Use `npm run dev` for hot reload
- Check browser console for errors
- Monitor backend logs for API issues
- Use Redux DevTools for state debugging

## 📞 Support

For issues or questions:
1. Check this setup guide
2. Review error logs
3. Verify environment variables
4. Test API endpoints individually

---

**Happy Coding! 🎉**