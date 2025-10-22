@echo off
echo ========================================
echo    Job Portal - Complete Application
echo ========================================

echo.
echo 🚀 Starting Job Portal Application...
echo.

echo ✅ Step 1: Starting Backend Server...
start "Job Portal Backend" cmd /k "cd Job-portal\backend && echo Backend Server Starting... && npm run dev"

echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo ✅ Step 2: Starting Frontend Server...
start "Job Portal Frontend" cmd /k "cd Job-portal\frontend && echo Frontend Server Starting... && npm run dev"

echo ⏳ Waiting for frontend to initialize...
timeout /t 3 /nobreak > nul

echo.
echo ========================================
echo    🎉 Application Started Successfully!
echo ========================================
echo.
echo 🌐 Access URLs:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8000
echo.
echo 📧 Test Login Credentials:
echo   Student:   student@test.com / 123456
echo   Recruiter: recruiter@test.com / 123456
echo   Admin:     admin@test.com / 123456
echo.
echo 🎯 Features to Test:
echo   ✅ Login/Signup with test accounts
echo   ✅ Browse and search 6 sample jobs
echo   ✅ Apply for jobs (as student)
echo   ✅ Post jobs (as recruiter)
echo   ✅ Chat with HR (chat icon bottom-right)
echo   ✅ Dark/Light theme toggle
echo   ✅ Admin analytics dashboard
echo   ✅ Profile management
echo   ✅ Resume upload
echo.
echo Opening application in browser...
timeout /t 2 /nobreak > nul
start http://localhost:5173

echo.
echo ========================================
echo Press any key to view test guide...
pause > nul
call test-functionality.bat