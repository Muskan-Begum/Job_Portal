# 🚀 Job Portal Deployment Guide

## 🎯 **Quick Deployment Options**

### **Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED**

#### **Step 1: Deploy Backend to Railway**
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your Job Portal repository
5. Choose the `Job-portal/backend` folder
6. Add environment variables:
   ```
   MONGO_URI=your-mongodb-atlas-connection
   SECRET_KEY=your-jwt-secret
   CLOUD_NAME=your-cloudinary-name
   API_KEY=your-cloudinary-key
   API_SECRET=your-cloudinary-secret
   PORT=8000
   ```
7. Deploy and get your backend URL (e.g., `https://your-app.railway.app`)

#### **Step 2: Deploy Frontend to Vercel**
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your Job Portal repository
5. Set root directory to `Job-portal/frontend`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-railway-backend-url.railway.app
   ```
7. Deploy and get your frontend URL

---

### **Option 2: Netlify (Frontend) + Render (Backend)**

#### **Backend on Render:**
1. Go to [Render.com](https://render.com)
2. Connect GitHub account
3. Create "New Web Service"
4. Select your repository
5. Set:
   - Root Directory: `Job-portal/backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables (same as above)

#### **Frontend on Netlify:**
1. Go to [Netlify.com](https://netlify.com)
2. Drag and drop your `Job-portal/frontend/dist` folder
3. Or connect GitHub for auto-deployment

---

### **Option 3: Full Stack on Railway**

1. Deploy backend first (as above)
2. Create another Railway service for frontend
3. Set build command: `npm run build`
4. Set start command: `npm run preview`

---

## 🔧 **Pre-deployment Setup**

### **1. Update API URLs for Production**