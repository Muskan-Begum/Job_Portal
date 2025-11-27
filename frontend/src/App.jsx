import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Analytics from './components/admin/Analytics'
import AdvancedAnalytics from './components/admin/AdvancedAnalytics'
import ResumeParser from './components/ResumeParser'
import ErrorBoundary from './components/ErrorBoundary'
import ChatSystem from './components/ChatSystem'
import About from './components/About'
import Contact from './components/Contact'
import NotFound from './components/NotFound'




const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path:"/admin/analytics",
    element:<ProtectedRoute><Analytics/></ProtectedRoute> 
  },
  {
    path:"/admin/advanced-analytics",
    element:<ProtectedRoute><AdvancedAnalytics/></ProtectedRoute> 
  },
  {
    path:"/resume-parser",
    element:<ResumeParser/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/contact",
    element:<Contact/>
  },
  {
    path:"*",
    element:<NotFound/>
  }

])

function App() {
  const { user } = useSelector(store => store.auth);
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <RouterProvider router={appRouter} />
        {user && <ChatSystem />}
      </div>
    </ErrorBoundary>
  )
}

export default App
