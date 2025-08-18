// hooks/useGetAllJobs.js

import { useEffect } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            // ✅ Step 1: Immediately clear previous job results
            dispatch(setAllJobs([])); 
            
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                
                // Step 2: Only update if the API call was successful AND returned jobs
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                // The state is already an empty array, so errors are handled correctly.
            }
        };
        fetchAllJobs();
    }, [searchedQuery, dispatch]); 
};

export default useGetAllJobs;