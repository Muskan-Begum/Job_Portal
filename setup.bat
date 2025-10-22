@echo off
echo ========================================
echo    Job Portal - Complete Setup
echo ========================================

echo.
echo Installing Backend Dependencies...
cd Job-portal\backend
call npm install

echo.
echo Installing Frontend Dependencies...
cd ..\frontend
call npm install

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Run start-backend.bat (in one terminal)
echo 2. Run start-frontend.bat (in another terminal)
echo.
echo Backend will run on: http://localhost:8000
echo Frontend will run on: http://localhost:5173
echo.
pause