@echo off
echo ========================================
echo    Job Portal - Setup Verification
echo ========================================

echo.
echo Checking Backend Dependencies...
cd Job-portal\backend
if exist node_modules (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Backend dependencies missing - run setup.bat
)

echo.
echo Checking Frontend Dependencies...
cd ..\frontend
if exist node_modules (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Frontend dependencies missing - run setup.bat
)

echo.
echo Checking Configuration Files...
cd ..\backend
if exist .env (
    echo ✅ Backend .env file exists
) else (
    echo ⚠️  Backend .env file missing - copy from .env.example
)

echo.
echo Checking Key Files...
if exist index.js (
    echo ✅ Backend entry point exists
) else (
    echo ❌ Backend index.js missing
)

cd ..\frontend
if exist src\main.jsx (
    echo ✅ Frontend entry point exists
) else (
    echo ❌ Frontend main.jsx missing
)

echo.
echo ========================================
echo    Verification Complete
echo ========================================
echo.
echo If all checks pass, run start-all.bat
echo to start the application.
echo.
pause