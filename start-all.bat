@echo off
echo ========================================
echo    Starting Job Portal Application
echo ========================================

echo Starting Backend Server...
start "Backend Server" cmd /k "cd Job-portal\backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd Job-portal\frontend && npm run dev"

echo.
echo ========================================
echo    Both servers are starting...
echo ========================================
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul