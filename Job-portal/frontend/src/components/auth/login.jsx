import React, { useState ,useEffect} from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
// import ConnectionTest from '../ConnectionTest'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading ,user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    


    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!input.email || !input.password || !input.role) {
            toast.error("Please fill all fields");
            return;
        }
        
        dispatch(setLoading(true));
        
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            dispatch(setLoading(false));
            toast.error("Request timeout - Check your connection");
        }, 10000);
        
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                timeout: 8000
            });
            
            clearTimeout(timeoutId);
            
            if (res.data && res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || "Login successful");
                navigate("/");
            } else {
                toast.error(res.data?.message || "Login failed");
            }
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.code === 'ECONNABORTED') {
                toast.error("Request timeout. Please try again.");
            } else if (error.response) {
                toast.error(error.response.data?.message || "Login failed");
            } else if (error.request) {
                toast.error("Unable to connect. Please check your connection.");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="muskan@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="12345678"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-one">Students</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }

                    <span className='text-sm'>Donot have an account? <Link to="/signup" className='text-blue-600'>signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login