import React from 'react'
import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Pen, Upload, Brain, TrendingUp, Eye } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import AppliedJobTable from './AppliedJobTable'
import UpdateprofileDialog from './UpdateprofileDialog'
import ResumeParser from './ResumeParser'
import ApplicationTracker from './ApplicationTracker'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"
import { usePerformance, usePageLoad } from '@/hooks/usePerformance'
import { ProfileSkeleton } from './ui/skeleton'
import { useEffect } from 'react'



const isResume = true
const Profile = () => { 
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const [showResumeParser, setShowResumeParser] = useState(false)
    const [loading, setLoading] = useState(true)
    const { user } = useSelector(store => store.auth)
    
    usePerformance('Profile')
    usePageLoad('Profile Page')
    
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])
    
    const handleSkillsExtracted = (skills) => {
        console.log('Extracted skills:', skills)
        // Here you would update the user profile with extracted skills
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-5 px-4 space-y-6'>
                {loading ? (
                    <ProfileSkeleton />
                ) : (
                    <>
                {/* Profile Header */}
                <Card>
                    <CardContent className='p-8'>
                        <div className='flex justify-between items-start'>
                            <div className='flex items-center gap-6'>
                                <Avatar className='h-24 w-24'>
                                    <AvatarImage src={user?.profile?.profilePhoto || "https://picsum.photos/seed/picsum/100"} alt="profile" />
                                </Avatar>
                                <div>
                                    <h1 className='font-bold text-2xl dark:text-white'>{user?.fullname}</h1>
                                    <p className='text-gray-600 dark:text-gray-300 mt-1'>{user?.profile?.bio || 'No bio available'}</p>
                                    <div className='flex items-center gap-4 mt-3'>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <Eye className='h-4 w-4' />
                                            <span>Profile views: 127</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <TrendingUp className='h-4 w-4' />
                                            <span>Profile strength: 85%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <Button onClick={() => setShowResumeParser(!showResumeParser)} variant="outline" className='flex items-center gap-2'>
                                    <Brain className='h-4 w-4' />
                                    AI Resume Parser
                                </Button>
                                <Button onClick={() => setOpen(true)} variant="outline">
                                    <Pen className='h-4 w-4' />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Contact & Skills */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center gap-3'>
                                <Mail className='h-5 w-5 text-gray-500' />
                                <span className='dark:text-white'>{user?.email}</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Contact className='h-5 w-5 text-gray-500' />
                                <span className='dark:text-white'>{user?.phoneNumber}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    user?.profile?.skills?.length > 0 ? 
                                        user.profile.skills.map((item, index) => (
                                            <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {item}
                                            </Badge>
                                        )) : 
                                        <span className='text-gray-500 dark:text-gray-400'>No skills added yet</span>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resume Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Upload className='h-5 w-5' />
                            Resume
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {
                            user?.profile?.resume ? (
                                <div className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center'>
                                            <span className='text-red-600 font-bold text-sm'>PDF</span>
                                        </div>
                                        <div>
                                            <p className='font-medium dark:text-white'>{user?.profile?.resumeOriginalName}</p>
                                            <p className='text-sm text-gray-500'>Uploaded resume</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <a href={user?.profile?.resume} target='_blank' rel='noopener noreferrer'>
                                            View Resume
                                        </a>
                                    </Button>
                                </div>
                            ) : (
                                <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                                    <Upload className='h-12 w-12 mx-auto mb-4 opacity-50' />
                                    <p>No resume uploaded yet</p>
                                    <Button onClick={() => setOpen(true)} className='mt-4'>
                                        Upload Resume
                                    </Button>
                                </div>
                            )
                        }
                    </CardContent>
                </Card>

                {/* AI Resume Parser */}
                {showResumeParser && (
                    <ResumeParser onSkillsExtracted={handleSkillsExtracted} />
                )}
                {/* Applied Jobs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Applied Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AppliedJobTable />
                    </CardContent>
                </Card>
                    </>
                )}
            </div>
            <UpdateprofileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
