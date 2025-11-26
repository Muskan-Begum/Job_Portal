import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { MapPin, Calendar, Users, DollarSign, Clock, Building, ArrowLeft, Share2 } from 'lucide-react'
import Navbar from './shared/Navbar'


const JobDescription = () => {
    // const isApplied = true;
    const params = useParams();
    const jobId = params.id;
    const {singleJob}=useSelector(store=>store.job)
    const {user}=useSelector(store=>store.auth)
    const dispatch = useDispatch()
    const isInitiallyApplied=singleJob?.applications?.some(application=>application.applicant===user?._id)||false
    const [isApplied,setIsApplied]=useState(isInitiallyApplied)



    const navigate = useNavigate();
    
    const applyJobHandler = async () => {
        if (!user) {
            toast.error('Please login to apply for jobs');
            navigate('/login');
            return;
        }
        
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                setIsApplied(true);
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updateSingleJob));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to apply for job');
        }
    };
    
    const shareJob = () => {
        if (navigator.share) {
            navigator.share({
                title: singleJob?.title,
                text: `Check out this job opportunity: ${singleJob?.title} at ${singleJob?.company?.name}`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Job link copied to clipboard!');
        }
    };
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                // console.log(jobId)
                const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
                }

            } catch (error) {
                console.log(error)

            }
        }
        fetchSingleJob();
    },[jobId,dispatch,user?._id])

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 px-4'>
                {/* Header */}
                <div className='flex items-center gap-4 mb-6'>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => navigate(-1)}
                        className='rounded-full'
                    >
                        <ArrowLeft className='h-4 w-4' />
                    </Button>
                    <div className='flex-1'>
                        <h1 className='text-3xl font-bold dark:text-white'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-2'>
                            <Building className='h-4 w-4 text-gray-500' />
                            <span className='text-lg text-gray-600 dark:text-gray-300'>{singleJob?.company?.name}</span>
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={shareJob}
                        className='rounded-full'
                    >
                        <Share2 className='h-4 w-4' />
                    </Button>
                </div>

                {/* Job Info Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700'>
                        <div className='flex items-center gap-2 mb-2'>
                            <MapPin className='h-5 w-5 text-blue-600' />
                            <span className='font-semibold dark:text-white'>Location</span>
                        </div>
                        <p className='text-gray-600 dark:text-gray-300'>{singleJob?.location}</p>
                        {singleJob?.isRemote && <Badge className='mt-2 bg-green-100 text-green-800'>Remote</Badge>}
                    </div>
                    
                    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700'>
                        <div className='flex items-center gap-2 mb-2'>
                            <DollarSign className='h-5 w-5 text-green-600' />
                            <span className='font-semibold dark:text-white'>Salary</span>
                        </div>
                        <p className='text-gray-600 dark:text-gray-300'>
                            {singleJob?.salary?.min ? `₹${singleJob?.salary?.min} - ₹${singleJob?.salary?.max} LPA` : `₹${singleJob?.salary} LPA`}
                        </p>
                    </div>
                    
                    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Clock className='h-5 w-5 text-purple-600' />
                            <span className='font-semibold dark:text-white'>Experience</span>
                        </div>
                        <p className='text-gray-600 dark:text-gray-300'>{singleJob?.experienceLevel} years</p>
                    </div>
                </div>

                {/* Job Tags */}
                <div className='flex flex-wrap gap-2 mb-8'>
                    <Badge className="text-blue-700 font-bold bg-blue-50 dark:bg-blue-900/20" variant="secondary">
                        <Users className='h-3 w-3 mr-1' />
                        {singleJob?.position} positions
                    </Badge>
                    <Badge className="text-[#F83002] font-bold bg-orange-50 dark:bg-orange-900/20" variant="secondary">
                        {singleJob?.jobType}
                    </Badge>
                    {singleJob?.skills?.map((skill, index) => (
                        <Badge key={index} className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300" variant="secondary">
                            {skill}
                        </Badge>
                    ))}
                </div>

                {/* Apply Button */}
                <div className='flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800'>
                    <div>
                        <h3 className='font-semibold text-lg dark:text-white'>Ready to apply?</h3>
                        <p className='text-gray-600 dark:text-gray-300'>Join {singleJob?.application?.length || 0} other applicants</p>
                    </div>
                    <Button 
                        onClick={isApplied ? null : applyJobHandler} 
                        disabled={isApplied} 
                        className={`px-8 py-3 rounded-lg font-semibold ${
                            isApplied 
                                ? 'bg-gray-400 text-white cursor-not-allowed' 
                                : 'bg-[#6A38C2] hover:bg-[#5b30a6] text-white'
                        }`}
                    >
                        {isApplied ? "✓ Applied" : "Apply Now"}
                    </Button>
                </div>
                {/* Job Description */}
                <div className='bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 mb-6'>
                    <h2 className='text-2xl font-bold mb-4 dark:text-white'>Job Description</h2>
                    <div className='prose dark:prose-invert max-w-none'>
                        <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                            {singleJob?.description}
                        </p>
                    </div>
                </div>

                {/* Requirements */}
                {singleJob?.requirements && (
                    <div className='bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 mb-6'>
                        <h2 className='text-2xl font-bold mb-4 dark:text-white'>Requirements</h2>
                        <div className='prose dark:prose-invert max-w-none'>
                            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                                {singleJob?.requirements}
                            </p>
                        </div>
                    </div>
                )}

                {/* Job Stats */}
                <div className='bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6'>
                    <h2 className='text-2xl font-bold mb-4 dark:text-white'>Job Statistics</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                        <div className='text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg'>
                            <Users className='h-8 w-8 mx-auto mb-2 text-blue-600' />
                            <p className='text-2xl font-bold dark:text-white'>{singleJob?.application?.length || 0}</p>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Applications</p>
                        </div>
                        <div className='text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg'>
                            <Calendar className='h-8 w-8 mx-auto mb-2 text-green-600' />
                            <p className='text-2xl font-bold dark:text-white'>
                                {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Posted Date</p>
                        </div>
                        <div className='text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg'>
                            <Clock className='h-8 w-8 mx-auto mb-2 text-purple-600' />
                            <p className='text-2xl font-bold dark:text-white'>
                                {singleJob?.deadline ? new Date(singleJob.deadline).toLocaleDateString() : 'Open'}
                            </p>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Deadline</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
