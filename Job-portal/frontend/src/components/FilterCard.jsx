import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { X, Filter } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata", "Remote"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "DevOps Engineer", "UI/UX Designer"]
    },
    {
        filterType: "Salary",
        array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"]
    },
    {
        filterType: "Experience",
        array: ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"]
    },
    {
        filterType: "Job Type",
        array: ["Full Time", "Part Time", "Contract", "Internship"]
    }
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();
    
    const changeHandler = (category, value) => {
        const newFilters = { ...selectedFilters, [category]: value };
        setSelectedFilters(newFilters);
        
        // Combine all selected filters into a search query
        const activeFilters = Object.values(newFilters).filter(Boolean);
        const searchQuery = activeFilters.join(' ');
        dispatch(setSearchedQuery(searchQuery));
    }
    
    const clearFilters = () => {
        setSelectedFilters({});
        dispatch(setSearchedQuery(''));
    }
    
    const hasActiveFilters = Object.values(selectedFilters).some(Boolean);
    
    return (
        <div className='w-full bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-slate-700'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2'>
                    <Filter className='h-5 w-5' />
                    Filter Jobs
                </h1>
                {hasActiveFilters && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className='text-red-600 hover:text-red-700'
                    >
                        <X className='h-4 w-4 mr-1' />
                        Clear All
                    </Button>
                )}
            </div>
            
            <hr className='mb-4 border-gray-200 dark:border-gray-600' />
            
            <div className='space-y-6'>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='space-y-3'>
                            <h2 className='font-semibold text-md text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2'>
                                {data.filterType}
                            </h2>
                            <RadioGroup 
                                value={selectedFilters[data.filterType] || ''} 
                                onValueChange={(value) => changeHandler(data.filterType, value)}
                                className='space-y-2 pl-2'
                            >
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `filter-${index}-${idx}`
                                        return (
                                            <div key={itemId} className='flex items-center space-x-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 transition-colors'>
                                                <RadioGroupItem 
                                                    value={item} 
                                                    id={itemId} 
                                                    className='border-gray-300 dark:border-gray-600'
                                                />
                                                <Label 
                                                    htmlFor={itemId} 
                                                    className='text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1'
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>
            
            {hasActiveFilters && (
                <div className='mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
                    <p className='text-sm text-blue-800 dark:text-blue-200 mb-2'>
                        <strong>Active Filters:</strong>
                    </p>
                    <div className='flex flex-wrap gap-2'>
                        {Object.entries(selectedFilters).map(([category, value]) => 
                            value && (
                                <span key={category} className='inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-xs'>
                                    {category}: {value}
                                    <button 
                                        onClick={() => changeHandler(category, '')}
                                        className='ml-1 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-full p-0.5'
                                    >
                                        <X className='h-3 w-3' />
                                    </button>
                                </span>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterCard