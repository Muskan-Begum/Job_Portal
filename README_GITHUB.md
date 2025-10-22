# 🚀 Job Portal - Enhanced Full-Stack Application

A modern, feature-rich job portal built with React 19, Node.js, and MongoDB. Perfect for connecting job seekers with opportunities and recruiters with talent.

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication with secure cookies
- Role-based access control (Student/Recruiter/Admin)
- Password hashing with bcrypt
- Google OAuth integration

### 💼 Job Management
- Advanced job posting with rich details
- Smart search with multiple filters
- AI-powered job recommendations
- Real-time application tracking

### 💬 Communication
- Real-time chat system with HR
- Typing indicators and message history
- Email notifications for updates
- Professional messaging interface

### 📊 Analytics & Insights
- Interactive admin dashboard
- Job performance metrics
- Application success rates
- User engagement analytics

### 🎨 Modern UI/UX
- Dark/light theme toggle
- Fully responsive design
- Smooth animations (Framer Motion)
- Professional design system
- Mobile-first approach

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
- Cloudinary (File uploads)
- Nodemailer (Emails)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/job-portal-enhanced.git
cd job-portal-enhanced
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

4. **Environment Configuration**
Create `.env` file in backend directory:
```env
MONGO_URI=your-mongodb-connection-string
SECRET_KEY=your-jwt-secret
CLOUD_NAME=your-cloudinary-name
API_KEY=your-cloudinary-key
API_SECRET=your-cloudinary-secret
```

5. **Run the Application**
```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)
cd frontend && npm run dev
```

## 📱 Features Showcase

### For Job Seekers
- Browse and search thousands of jobs
- Apply with one-click
- Track application status
- Chat with recruiters
- Personalized job recommendations

### For Recruiters
- Post detailed job listings
- Manage applications efficiently
- Access candidate profiles
- Company branding and profiles
- Analytics and insights

### For Admins
- System-wide analytics
- User management
- Platform oversight
- Performance metrics

## 🎯 Demo Credentials

```
Student Account:
Email: student@test.com
Password: 123456

Recruiter Account:
Email: recruiter@test.com
Password: 123456
```

## 📊 Project Statistics

- **50+ React Components**
- **15+ API Endpoints**
- **4 Database Collections**
- **100% Mobile Responsive**
- **Dark/Light Theme Support**
- **Real-time Features**

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout

### Jobs
- `GET /api/v1/job/get` - Get jobs with filters
- `POST /api/v1/job/post` - Create job (Recruiter)
- `GET /api/v1/job/:id` - Get job details

### Applications
- `POST /api/v1/application/apply/:id` - Apply for job
- `GET /api/v1/application/get` - Get applications
- `PUT /api/v1/application/status/:id` - Update status

## 🎨 Screenshots

*Add screenshots of your application here*

## 🚀 Deployment

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy from GitHub
3. Update CORS origins

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Update API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for utility-first styling
- MongoDB for flexible database solution
- All open-source contributors

---

**⭐ Star this repository if you found it helpful!**

**🔗 [Live Demo](your-deployed-url) | 📧 [Contact](mailto:your-email)**