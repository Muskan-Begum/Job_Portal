# 🧪 Complete Job Portal Testing Guide

## 🚀 Quick Start
1. Open http://localhost:5173
2. Backend should be running on http://localhost:8000

## 📧 Test Accounts
```
Student:   student@test.com / 123456
Recruiter: recruiter@test.com / 123456  
Admin:     admin@test.com / 123456
```

## ✅ Test Checklist

### 1. Authentication & Registration
- [ ] **Signup**: Create new account with email/password
- [ ] **Login**: Use test credentials above
- [ ] **Role Selection**: Choose Student/Recruiter during login
- [ ] **Logout**: Click logout in navbar
- [ ] **Protected Routes**: Try accessing /admin without login

### 2. Student Features
**Login as: student@test.com**
- [ ] **Browse Jobs**: See 6 sample jobs on homepage
- [ ] **Job Search**: Use search bar for "React" or "Python"
- [ ] **Job Filters**: Filter by location, salary, experience
- [ ] **Job Details**: Click job card to view full description
- [ ] **Apply for Job**: Click "Apply Now" button
- [ ] **Application Tracking**: View applied jobs in profile
- [ ] **Profile Update**: Edit bio, skills, upload resume
- [ ] **Job Recommendations**: Check personalized suggestions

### 3. Recruiter Features  
**Login as: recruiter@test.com**
- [ ] **Company Setup**: Create/edit company profile
- [ ] **Post Job**: Create new job posting
- [ ] **Job Management**: View posted jobs in admin panel
- [ ] **Applications**: See job applications from students
- [ ] **Application Status**: Update application status
- [ ] **Applicant Details**: View applicant profiles

### 4. Admin Features
**Login as: admin@test.com**
- [ ] **Analytics Dashboard**: View charts and metrics
- [ ] **User Management**: See all registered users
- [ ] **Job Overview**: Monitor all job postings
- [ ] **System Stats**: Check platform statistics
- [ ] **Advanced Analytics**: Detailed performance metrics

### 5. Search & Filter System
- [ ] **Basic Search**: Search by job title
- [ ] **Location Filter**: Filter by city/remote
- [ ] **Salary Range**: Set min/max salary filters
- [ ] **Experience Level**: Filter by years of experience
- [ ] **Skills Filter**: Search by required skills
- [ ] **Job Type**: Filter full-time/part-time/contract
- [ ] **Advanced Search**: Combine multiple filters
- [ ] **Reset Filters**: Clear all applied filters

### 6. Interactive Features
- [ ] **Chat System**: Click purple chat icon (bottom-right)
- [ ] **Send Messages**: Type and send messages to HR
- [ ] **Typing Indicator**: See "typing..." animation
- [ ] **Chat History**: View conversation history
- [ ] **Theme Toggle**: Switch dark/light mode (top-right)
- [ ] **Responsive Design**: Test on mobile/tablet sizes
- [ ] **Notifications**: Check for status updates

### 7. File Upload & Management
- [ ] **Resume Upload**: Upload PDF resume in profile
- [ ] **Profile Photo**: Upload profile picture
- [ ] **Company Logo**: Upload company logo (recruiter)
- [ ] **File Validation**: Test with invalid file types
- [ ] **File Preview**: View uploaded files

### 8. Data Validation & Error Handling
- [ ] **Form Validation**: Submit empty forms
- [ ] **Email Format**: Test invalid email formats
- [ ] **Password Strength**: Test weak passwords
- [ ] **Required Fields**: Leave required fields empty
- [ ] **Network Errors**: Test with backend offline
- [ ] **Loading States**: Check loading indicators

### 9. UI/UX Testing
- [ ] **Navigation**: Test all navbar links
- [ ] **Breadcrumbs**: Check page navigation
- [ ] **Pagination**: Browse through job pages
- [ ] **Sorting**: Sort jobs by date/salary/relevance
- [ ] **Animations**: Check smooth transitions
- [ ] **Icons & Images**: Verify all assets load
- [ ] **Tooltips**: Hover over interactive elements

### 10. Performance & Accessibility
- [ ] **Page Load Speed**: Check initial load time
- [ ] **Search Performance**: Test search response time
- [ ] **Mobile Performance**: Test on mobile devices
- [ ] **Keyboard Navigation**: Navigate using Tab key
- [ ] **Screen Reader**: Test with accessibility tools
- [ ] **Color Contrast**: Check in both themes

## 🎯 Sample Test Data

### Jobs Available:
1. Frontend Developer - TechCorp Inc ($70k-$90k)
2. Full Stack Developer - StartupXYZ ($80k-$120k) 
3. Python Developer - Global Solutions ($75k-$100k)
4. UI/UX Designer - TechCorp Inc ($65k-$85k)
5. DevOps Engineer - StartupXYZ ($90k-$130k)
6. Data Scientist - Global Solutions ($95k-$140k)

### Test Scenarios:
- **Search "React"**: Should find Frontend & Full Stack jobs
- **Filter "Remote"**: Should show Python, DevOps, Data Scientist
- **Salary $80k+**: Should show 4 jobs
- **Experience 2-3 years**: Should show 3 jobs

## 🐛 Common Issues & Solutions

### Backend Connection Issues:
- Check if backend is running on port 8000
- Verify MongoDB connection in backend logs
- Check CORS settings for localhost:5173

### Frontend Issues:
- Clear browser cache and cookies
- Check browser console for JavaScript errors
- Verify API endpoints in network tab

### Database Issues:
- Run `node seedData.js` to reset sample data
- Check MongoDB Atlas connection string
- Verify database name is "jobportal"

## 📊 Expected Results

### After Testing:
- ✅ All 6 jobs should be visible and searchable
- ✅ Login should work with all 3 test accounts
- ✅ Job applications should be trackable
- ✅ Chat system should be interactive
- ✅ Theme toggle should work smoothly
- ✅ All forms should validate properly
- ✅ File uploads should work with Cloudinary
- ✅ Admin dashboard should show analytics

## 🎉 Success Criteria
- [ ] All authentication flows work
- [ ] Job search and filtering functional
- [ ] Application process complete
- [ ] Chat system interactive
- [ ] Admin features accessible
- [ ] UI responsive and smooth
- [ ] No console errors
- [ ] All test accounts work

**Your Job Portal is production-ready when all items are checked!** ✅