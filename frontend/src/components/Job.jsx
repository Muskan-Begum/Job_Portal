import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, DollarSign, Users } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from "./ui/badge"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'


const Job = ({ job }) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const [isSaved, setIsSaved] = useState(false);
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60))

    }
    return (
        <div className='p-6 rounded-lg shadow-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 cursor-pointer'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-gray-400' />
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                </div>
                <Button 
                    variant="outline" 
                    className="rounded-full" 
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsSaved(!isSaved);
                        toast.success(isSaved ? 'Job removed from saved' : 'Job saved for later');
                    }}
                >
                    <Bookmark className={isSaved ? 'fill-current text-blue-600' : ''} />
                </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>


                <div className="h-12 w-12">
                    <Avatar>

                        <AvatarImage src={job?.company?.logo} />



                    </Avatar>

                </div>
                <div>
                    <h1 className='font-medium text-lg dark:text-white'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4 text-gray-400' />
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{job?.location || 'Remote'}</p>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <h1 className='font-bold text-xl mb-2 dark:text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
                    {job?.description?.length > 120 ? job?.description?.substring(0, 120) + '...' : job?.description}
                </p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold bg-blue-50 dark:bg-blue-900/20" variant="secondary">
                    <Users className='h-3 w-3 mr-1' />
                    {job?.position} positions
                </Badge>
                <Badge className="text-[#F83002] font-bold bg-orange-50 dark:bg-orange-900/20" variant="secondary">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold bg-purple-50 dark:bg-purple-900/20" variant="secondary">
                    <DollarSign className='h-3 w-3 mr-1' />
                    {job?.salary?.min ? `${job?.salary?.min}-${job?.salary?.max}` : job?.salary} LPA
                </Badge>
                {job?.isRemote && (
                    <Badge className="text-green-700 font-bold bg-green-50 dark:bg-green-900/20" variant="secondary">
                        Remote
                    </Badge>
                )}
            </div>
            <div className='flex items-center gap-3 mt-6'>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }} 
                    variant="outline" 
                    className="flex-1 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                    View Details
                </Button>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!user) {
                            toast.error('Please login to apply for jobs');
                            navigate('/login');
                            return;
                        }
                        navigate(`/description/${job?._id}`);
                    }}
                    className="flex-1 bg-[#6A38C2] hover:bg-[#5b30a6] rounded-lg text-white"
                >
                    Apply Now
                </Button>
            </div>




        </div>


    )
}

export default Job
