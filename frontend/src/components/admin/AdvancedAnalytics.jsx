import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Briefcase, Eye, Calendar, Target, Award, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

const AdvancedAnalytics = () => {
    const [timeRange, setTimeRange] = useState('7d');
    const [analytics, setAnalytics] = useState(null);

    // Mock analytics data
    useEffect(() => {
        const mockData = {
            overview: {
                totalJobs: 156,
                totalApplications: 2847,
                totalViews: 12453,
                conversionRate: 22.8,
                avgTimeToHire: 14,
                topPerformingJob: 'Senior React Developer'
            },
            jobTrends: [
                { date: '2024-01-01', jobs: 12, applications: 145, views: 890 },
                { date: '2024-01-02', jobs: 8, applications: 167, views: 1200 },
                { date: '2024-01-03', jobs: 15, applications: 234, views: 1450 },
                { date: '2024-01-04', jobs: 11, applications: 198, views: 1100 },
                { date: '2024-01-05', jobs: 19, applications: 289, views: 1680 },
                { date: '2024-01-06', jobs: 14, applications: 245, views: 1320 },
                { date: '2024-01-07', jobs: 22, applications: 356, views: 1890 }
            ],
            applicationStatus: [
                { name: 'Applied', value: 45, color: '#3B82F6' },
                { name: 'Reviewing', value: 25, color: '#F59E0B' },
                { name: 'Interview', value: 15, color: '#8B5CF6' },
                { name: 'Offered', value: 10, color: '#10B981' },
                { name: 'Rejected', value: 5, color: '#EF4444' }
            ],
            topSkills: [
                { skill: 'React', demand: 89, growth: 12 },
                { skill: 'Node.js', demand: 76, growth: 8 },
                { skill: 'Python', demand: 82, growth: 15 },
                { skill: 'AWS', demand: 71, growth: 22 },
                { skill: 'TypeScript', demand: 68, growth: 18 }
            ],
            recentActivity: [
                { type: 'application', message: 'New application for Senior Developer', time: '2 min ago', user: 'John Doe' },
                { type: 'job', message: 'New job posted: Frontend Engineer', time: '15 min ago', user: 'Tech Corp' },
                { type: 'interview', message: 'Interview scheduled', time: '1 hour ago', user: 'Jane Smith' },
                { type: 'hire', message: 'Candidate hired for React Developer', time: '2 hours ago', user: 'StartupXYZ' }
            ]
        };
        setAnalytics(mockData);
    }, [timeRange]);

    if (!analytics) {
        return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold dark:text-white">Advanced Analytics</h1>
                <div className="flex gap-2">
                    {['7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 rounded-md text-sm ${
                                timeRange === range 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Total Jobs</p>
                                <p className="text-3xl font-bold">{analytics.overview.totalJobs}</p>
                                <p className="text-sm text-blue-100">+12% from last month</p>
                            </div>
                            <Briefcase className="h-12 w-12 text-blue-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Applications</p>
                                <p className="text-3xl font-bold">{analytics.overview.totalApplications.toLocaleString()}</p>
                                <p className="text-sm text-green-100">+18% from last month</p>
                            </div>
                            <Users className="h-12 w-12 text-green-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Total Views</p>
                                <p className="text-3xl font-bold">{analytics.overview.totalViews.toLocaleString()}</p>
                                <p className="text-sm text-purple-100">+25% from last month</p>
                            </div>
                            <Eye className="h-12 w-12 text-purple-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100">Conversion Rate</p>
                                <p className="text-3xl font-bold">{analytics.overview.conversionRate}%</p>
                                <p className="text-sm text-orange-100">+3.2% from last month</p>
                            </div>
                            <Target className="h-12 w-12 text-orange-200" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Job Trends
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={analytics.jobTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="applications" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="views" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Application Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={analytics.applicationStatus}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {analytics.applicationStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Skills & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Skills in Demand</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.topSkills.map((skill, index) => (
                                <div key={skill.skill} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                                        </div>
                                        <span className="font-medium dark:text-white">{skill.skill}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${skill.demand}%` }}
                                            ></div>
                                        </div>
                                        <Badge variant="secondary" className="text-green-600">
                                            +{skill.growth}%
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                        activity.type === 'application' ? 'bg-blue-500' :
                                        activity.type === 'job' ? 'bg-green-500' :
                                        activity.type === 'interview' ? 'bg-purple-500' :
                                        'bg-orange-500'
                                    }`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm dark:text-white">{activity.message}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdvancedAnalytics;