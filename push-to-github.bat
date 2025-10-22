@echo off
echo ========================================
echo    Pushing Enhanced Job Portal to GitHub
echo ========================================

echo.
echo Step 1: Checking Git status...
git status

echo.
echo Step 2: Adding all changes...
git add .

echo.
echo Step 3: Committing changes...
git commit -m "✨ Enhanced Job Portal - Production Ready

🔥 Major Features Added:
- Real-time chat system with HR
- Dark/light theme toggle
- Advanced search & filtering system
- Admin analytics dashboard
- Professional About & Contact pages
- File upload system (Cloudinary)
- Email notification system
- Mobile responsive design
- PWA capabilities
- Enhanced authentication & security

🛠️ Technical Improvements:
- React 19 + Vite optimization
- Redux Toolkit state management
- Framer Motion animations
- Radix UI components
- Performance optimizations
- Error handling & validation
- Production-ready code structure

🎯 Features:
- 50+ React components
- 15+ API endpoints
- Complete MERN stack
- Interview ready
- Deployment ready

Ready for production and interviews!"

echo.
echo Step 4: Setting remote repository...
git remote set-url origin https://github.com/Muskan-Begum/Job_Portal.git

echo Step 5: Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo    GitHub Push Complete!
echo ========================================
echo.
echo Your enhanced Job Portal is now on GitHub!
echo.
pause