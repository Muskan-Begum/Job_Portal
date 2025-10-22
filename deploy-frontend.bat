@echo off
echo ========================================
echo    Building Frontend for Deployment
echo ========================================

cd Job-portal\frontend
echo Building production version...
npm run build

echo.
echo ========================================
echo    Build Complete!
echo ========================================
echo.
echo The 'dist' folder is ready for deployment.
echo You can now:
echo 1. Drag 'dist' folder to Netlify.com
echo 2. Upload to Vercel.com
echo 3. Deploy to any static hosting
echo.
pause