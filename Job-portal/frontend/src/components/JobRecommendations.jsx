import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Clock, Star } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';

const JobRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/recommendations`, { withCredentials: true });
            if (res.data.success) {
                setRecommendations(res.data.recommendations);
            }
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading recommendations...</div>;
    }

    if (recommendations.length === 0) {
        return (
            <Card>
                <CardContent className="text-center py-8">
                    <p className="text-gray-500">No recommendations available. Complete your profile to get personalized job suggestions.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Recommended for You
            </h2>
            
            <div className="grid gap-4">
                {recommendations.map((job) => (
                    <Card key={job._id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-lg">{job.title}</h3>
                                        {job.recommendationScore && (
                                            <Badge variant="secondary" className="text-xs">
                                                {Math.round(job.recommendationScore * 10)}% match
                                            </Badge>
                                        )}
                                    </div>
                                    
                                    <p className="text-gray-600 mb-2">{job.company?.name}</p>
                                    
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job.location}
                                            {job.isRemote && <Badge variant="outline" className="ml-1">Remote</Badge>}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {job.skills?.slice(0, 3).map((skill, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                        {job.skills?.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{job.skills.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                            <span className="font-medium">
                                                ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}
                                            </span>
                                            <span className="text-gray-500 ml-2">{job.jobType}</span>
                                        </div>
                                        
                                        <Button 
                                            size="sm" 
                                            onClick={() => navigate(`/description/${job._id}`)}
                                            className="bg-[#6A38C2] hover:bg-[#5b30a6]"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default JobRecommendations;