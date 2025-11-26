import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ThemeToggle from '../ThemeToggle'
import NotificationSystem from '../NotificationSystem'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='navbar bg-gray-500 dark:bg-gray-200 border-b border-gray-200 dark:border-gray-700 shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold text-black'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 text-black'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="text-black">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="text-black">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="text-black">Home</Link></li>
                                    <li><Link to="/jobs" className="text-black">Jobs</Link></li>
                                    <li><Link to="/browse" className="text-black">Browse</Link></li>
                                    <li><Link to="/about" className="text-black">About</Link></li>
                                    <li><Link to="/contact" className="text-black">Contact</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <ThemeToggle />
                                <Link to="/login">
                                    <Button variant="outline" className='border-gray-300 text-black'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-3'>
                                <ThemeToggle />
                                <NotificationSystem />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-1 transition-colors">
                                            <Avatar className="w-8 h-8 border-2 border-gray-200 dark:border-gray-600">
                                                <AvatarImage 
                                                    src={user?.profile?.profilePhoto} 
                                                    alt={user?.fullname} 
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="bg-[#6A38C2] text-white font-semibold">
                                                    {user?.fullname?.charAt(0)?.toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden md:block text-left">
                                                <p className="text-sm font-medium text-black">{user?.fullname}</p>
                                                <p className="text-xs text-black capitalize">{user?.role}</p>
                                            </div>
                                        </div>
                                    </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                                    <div className='p-2'>
                                        <div className='flex gap-3 items-start mb-4'>
                                            <Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-600">
                                                <AvatarImage 
                                                    src={user?.profile?.profilePhoto} 
                                                    alt={user?.fullname}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="bg-[#6A38C2] text-white font-semibold text-lg">
                                                    {user?.fullname?.charAt(0)?.toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h4 className='font-semibold text-black dark:text-white'>{user?.fullname}</h4>
                                                <p className='text-sm text-black dark:text-white'>{user?.email}</p>
                                                <p className='text-xs text-black dark:text-white capitalize mt-1'>{user?.role}</p>
                                                {user?.profile?.bio && (
                                                    <p className='text-sm text-black dark:text-white mt-2 line-clamp-2'>{user?.profile?.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1 border-t border-gray-200 dark:border-gray-700 pt-3'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile" className="w-full">
                                                        <Button variant="ghost" className='w-full justify-start gap-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                                                            <User2 className="w-4 h-4" />
                                                            View Profile
                                                        </Button>
                                                    </Link>
                                                )
                                            }

                                            <Button 
                                                onClick={logoutHandler} 
                                                variant="ghost" 
                                                className='w-full justify-start gap-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar