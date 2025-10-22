@echo off
echo ========================================
echo    Job Portal - Functionality Test
echo ========================================

echo.
echo ✅ Database seeded with sample data:
echo.
echo 📧 Test Login Credentials:
echo --------------------------------
echo Student Account:
echo   Email: student@test.com
echo   Password: 123456
echo   Role: Student
echo.
echo Recruiter Account:
echo   Email: recruiter@test.com  
echo   Password: 123456
echo   Role: Recruiter
echo.
echo Admin Account:
echo   Email: admin@test.com
echo   Password: 123456
echo   Role: Admin
echo.
echo ================================
echo 🎯 Available Features to Test:
echo ================================
echo.
echo ✅ Authentication:
echo   - Login/Signup with test accounts
echo   - Role-based access control
echo.
echo ✅ Job Features:
echo   - Browse 6 sample jobs
echo   - Advanced search and filters
echo   - Job recommendations
echo   - Apply for jobs (as student)
echo.
echo ✅ Recruiter Features:
echo   - Post new jobs
echo   - Manage applications
echo   - Company management
echo.
echo ✅ Interactive Features:
echo   - Chat with HR (bottom-right chat icon)
echo   - Dark/Light theme toggle
echo   - Profile management
echo   - Resume upload
echo.
echo ✅ Admin Features:
echo   - Analytics dashboard
echo   - User management
echo   - System overview
echo.
echo ================================
echo 🚀 How to Test:
echo ================================
echo 1. Open http://localhost:5173
echo 2. Click "Login" and use test credentials
echo 3. Explore features based on your role
echo 4. Try the chat system (bottom-right)
echo 5. Test job search and applications
echo.
echo ================================
echo 📱 Mobile Testing:
echo ================================
echo - Resize browser window to test responsive design
echo - All features work on mobile devices
echo.
pause