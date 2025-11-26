import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import SmartSearch from './SmartSearch'


const HeroSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (searchData) => {
        dispatch(setSearchedQuery(searchData.query))
        navigate("/jobs")
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium text-[#F83002]'>Job Portal Platform</span>
                <h1 className='text-5xl font-bold'>Find Your Perfect Job &<br></br> Build Your  <span className='text-[#6A38C2]'>Career</span></h1>
                <p className='text-gray-600 max-w-2xl mx-auto'>Connect with top companies, discover exciting opportunities, and take the next step in your professional journey. Join thousands of professionals who found their dream jobs through our platform.</p>
                <SmartSearch onSearch={handleSearch} />
            </div>

        </div>
    )
}

export default HeroSection
