import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Clock, XCircle, Calendar } from 'lucide-react';

const ApplicationTracker = ({ application }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'applied': return <Clock className="h-4 w-4 text-blue-500" />;
            case 'reviewing': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'shortlisted': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'interview': return <Calendar className="h-4 w-4 text-purple-500" />;
            case 'offered': return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'accepted': return <CheckCircle className="h-4 w-4 text-green-700" />;
            case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
            default: return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied': return 'bg-blue-100 text-blue-800';
            case 'reviewing': return 'bg-yellow-100 text-yellow-800';
            case 'shortlisted': return 'bg-green-100 text-green-800';
            case 'interview': return 'bg-purple-100 text-purple-800';
            case 'offered': return 'bg-green-200 text-green-900';
            case 'accepted': return 'bg-green-300 text-green-900';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Application Status</span>
                    <Badge className={getStatusColor(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {application.timeline?.map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                            {getStatusIcon(event.status)}
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium capitalize">{event.status}</h4>
                                    <span className="text-sm text-gray-500">
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                </div>
                                {event.note && (
                                    <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {application.interviewDate && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-purple-800">Interview Scheduled</span>
                        </div>
                        <p className="text-sm text-purple-700 mt-1">
                            {new Date(application.interviewDate).toLocaleString()}
                        </p>
                    </div>
                )}
                
                {application.feedback && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-800">Feedback</h5>
                        <p className="text-sm text-gray-600 mt-1">{application.feedback}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ApplicationTracker;