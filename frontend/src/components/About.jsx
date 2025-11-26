import React from 'react';
import Navbar from './shared/Navbar';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        About Job Portal
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Connecting talented professionals with amazing opportunities. 
                        We're building the future of job searching and recruitment.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#6A38C2] mb-2">10K+</div>
                        <div className="text-gray-600 dark:text-gray-300">Active Jobs</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#6A38C2] mb-2">50K+</div>
                        <div className="text-gray-600 dark:text-gray-300">Job Seekers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#6A38C2] mb-2">5K+</div>
                        <div className="text-gray-600 dark:text-gray-300">Companies</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#6A38C2] mb-2">95%</div>
                        <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <Users className="w-12 h-12 text-[#6A38C2] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">Expert Team</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Experienced professionals dedicated to your success
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <Target className="w-12 h-12 text-[#6A38C2] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">Targeted Matching</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            AI-powered job matching for perfect opportunities
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <Award className="w-12 h-12 text-[#6A38C2] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">Quality Assured</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Verified companies and premium job listings
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <Globe className="w-12 h-12 text-[#6A38C2] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">Global Reach</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Opportunities worldwide, remote and on-site
                        </p>
                    </div>
                </div>

                {/* Mission */}
                <div className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] rounded-lg p-8 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg max-w-4xl mx-auto">
                        To revolutionize the job search experience by connecting the right talent 
                        with the right opportunities through innovative technology, personalized 
                        matching, and exceptional user experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;