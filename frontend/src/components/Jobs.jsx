import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import AdvancedSearch from './AdvancedSearch';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { JobCardSkeleton } from './ui/skeleton';
import { usePerformance } from '@/hooks/usePerformance';



const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    
    usePerformance('Jobs');

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);
    
    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleAdvancedSearch = async (filters) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });
            
            const res = await axios.get(`${JOB_API_END_POINT}/get?${queryParams}`);
            if (res.data.success) {
                setFilterJobs(res.data.jobs);
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFilterJobs(allJobs);
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <AdvancedSearch onSearch={handleAdvancedSearch} onReset={handleReset} />
                <div className='flex gap-6'>
                    <div className='w-1/4 min-w-[280px]'>
                        <FilterCard />
                    </div>
                    {
                        initialLoading ? (
                            <div className='flex-1'>
                                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {[...Array(6)].map((_, index) => (
                                        <JobCardSkeleton key={index} />
                                    ))}
                                </div>
                            </div>
                        ) : filterJobs.length <= 0 ? (
                            <div className='flex-1 flex items-center justify-center h-64'>
                                <div className='text-center'>
                                    <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>No Jobs Found</h3>
                                    <p className='text-gray-600 dark:text-gray-400'>Try adjusting your filters or search criteria</p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                {loading && (
                                    <div className='flex justify-center items-center h-32'>
                                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#6A38C2]'></div>
                                    </div>
                                )}
                                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs