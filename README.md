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
- React 19 with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization
- Radix UI components

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Cloudinary for file uploads
- Nodemailer for emails
- Google OAuth integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Gmail account for email service
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Job-portal
```

2. **Backend Setup**
```bash
cd Job-portal/backend
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
MONGO_URI=mongodb+srv://your-connection-string
PORT=8000
SECRET_KEY=your-jwt-secret-key
CLOUD_NAME=your-cloudinary-name
API_SECRET=your-cloudinary-secret
API_KEY=your-cloudinary-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FRONTEND_URL=http://localhost:5173
```

5. **Run the Application**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to access the application.

## 📱 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/google-auth` - Google OAuth
- `GET /api/v1/user/logout` - User logout
- `PUT /api/v1/user/preferences` - Update user preferences

### Jobs
- `GET /api/v1/job/get` - Get all jobs with filters
- `GET /api/v1/job/trending` - Get trending jobs
- `GET /api/v1/job/analytics` - Get job analytics
- `POST /api/v1/job/post` - Create new job
- `GET /api/v1/job/:id` - Get job details

### Applications
- `POST /api/v1/application/apply/:id` - Apply for job
- `GET /api/v1/application/get` - Get user applications
- `PUT /api/v1/application/status/update/:id` - Update application status

## 🧪 Testing

Run backend tests:
```bash
cd backend
npm test
```

## 🎨 UI Components

The application uses a modern design system with:
- Responsive layouts
- Dark/Light theme support
- Smooth animations
- Accessible components
- Mobile-first approach

## 📊 Features Showcase

### Advanced Search
- Filter by multiple criteria simultaneously
- Real-time search results
- Pagination support
- Save search preferences

### Application Tracking
- Visual timeline of application progress
- Status updates with notifications
- Interview scheduling
- Recruiter feedback system

### Admin Dashboard
- Comprehensive analytics
- Job performance metrics
- User engagement insights
- Interactive data visualization

### Email Notifications
- Automated application confirmations
- Status update notifications
- Interview reminders
- Custom email templates

## 🔧 Configuration

### Email Setup
1. Enable 2-factor authentication on Gmail
2. Generate app-specific password
3. Update EMAIL_USER and EMAIL_PASS in .env

### Google OAuth Setup
1. Create project in Google Cloud Console
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

### Cloudinary Setup
1. Create Cloudinary account
2. Get API credentials from dashboard
3. Update CLOUD_NAME, API_KEY, and API_SECRET

## 🚀 Deployment

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy from GitHub
3. Update CORS origins

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
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
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database solution
- All open-source contributors

---

**Made with ❤️ for interview success**

*This project demonstrates modern full-stack development practices and is designed to impress technical recruiters with its comprehensive feature set and clean architecture.*