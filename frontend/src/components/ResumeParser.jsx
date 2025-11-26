import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Upload, FileText, Brain, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ResumeParser = ({ onSkillsExtracted }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedData, setExtractedData] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    // Mock AI parsing function
    const parseResume = async (file) => {
        setIsProcessing(true);
        
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Mock extracted data (in real app, this would come from AI service)
        const mockExtractedData = {
            personalInfo: {
                name: 'John Doe',
                email: 'john.doe@email.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA'
            },
            skills: [
                { name: 'React', confidence: 95, category: 'Frontend' },
                { name: 'Node.js', confidence: 88, category: 'Backend' },
                { name: 'JavaScript', confidence: 92, category: 'Programming' },
                { name: 'TypeScript', confidence: 85, category: 'Programming' },
                { name: 'MongoDB', confidence: 78, category: 'Database' },
                { name: 'AWS', confidence: 82, category: 'Cloud' },
                { name: 'Docker', confidence: 75, category: 'DevOps' },
                { name: 'Git', confidence: 90, category: 'Tools' }
            ],
            experience: [
                {
                    title: 'Senior Frontend Developer',
                    company: 'Tech Corp',
                    duration: '2022 - Present',
                    description: 'Led development of React applications'
                },
                {
                    title: 'Full Stack Developer',
                    company: 'StartupXYZ',
                    duration: '2020 - 2022',
                    description: 'Built scalable web applications'
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Computer Science',
                    institution: 'University of Technology',
                    year: '2020'
                }
            ],
            summary: 'Experienced full-stack developer with 4+ years of experience in React, Node.js, and cloud technologies. Passionate about building scalable web applications.',
            matchScore: 87
        };
        
        setExtractedData(mockExtractedData);
        setIsProcessing(false);
        
        if (onSkillsExtracted) {
            onSkillsExtracted(mockExtractedData.skills.map(skill => skill.name));
        }
        
        toast.success('Resume parsed successfully!');
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setUploadedFile(file);
            parseResume(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1
    });

    const getConfidenceColor = (confidence) => {
        if (confidence >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
        if (confidence >= 75) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
        if (confidence >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Resume Parser
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                            isDragActive 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                        }`}
                    >
                        <input {...getInputProps()} />
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        {isDragActive ? (
                            <p className="text-blue-600 dark:text-blue-400">Drop your resume here...</p>
                        ) : (
                            <div>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    Drag & drop your resume here, or click to select
                                </p>
                                <p className="text-sm text-gray-500">
                                    Supports PDF, DOC, DOCX files
                                </p>
                            </div>
                        )}
                    </div>

                    {uploadedFile && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="text-sm dark:text-white">{uploadedFile.name}</span>
                            {isProcessing && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
                        </div>
                    )}
                </CardContent>
            </Card>

            {isProcessing && (
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-center space-x-3">
                            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                            <span className="text-lg dark:text-white">AI is analyzing your resume...</span>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="text-sm text-gray-600 dark:text-gray-400">✓ Extracting personal information</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">✓ Identifying skills and technologies</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">✓ Analyzing work experience</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">⏳ Calculating job match score</div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {extractedData && !isProcessing && (
                <div className="space-y-6">
                    {/* Match Score */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold dark:text-white">Profile Match Score</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Based on current job market trends</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-green-600">{extractedData.matchScore}%</div>
                                    <Badge className="bg-green-100 text-green-800">Excellent Match</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Extracted Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Extracted Skills ({extractedData.skills.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(
                                    extractedData.skills.reduce((acc, skill) => {
                                        if (!acc[skill.category]) acc[skill.category] = [];
                                        acc[skill.category].push(skill);
                                        return acc;
                                    }, {})
                                ).map(([category, skills]) => (
                                    <div key={category} className="space-y-2">
                                        <h4 className="font-medium text-gray-800 dark:text-gray-200">{category}</h4>
                                        <div className="space-y-2">
                                            {skills.map((skill) => (
                                                <div key={skill.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                                    <span className="text-sm dark:text-white">{skill.name}</span>
                                                    <Badge className={getConfidenceColor(skill.confidence)}>
                                                        {skill.confidence}%
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Extracted Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2 dark:text-white">Personal Details</h4>
                                    <div className="space-y-1 text-sm">
                                        <p className="dark:text-gray-300"><strong>Name:</strong> {extractedData.personalInfo.name}</p>
                                        <p className="dark:text-gray-300"><strong>Email:</strong> {extractedData.personalInfo.email}</p>
                                        <p className="dark:text-gray-300"><strong>Phone:</strong> {extractedData.personalInfo.phone}</p>
                                        <p className="dark:text-gray-300"><strong>Location:</strong> {extractedData.personalInfo.location}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2 dark:text-white">Professional Summary</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{extractedData.summary}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-blue-600" />
                                AI Recommendations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-sm text-blue-800 dark:text-blue-400">
                                        <strong>Skill Enhancement:</strong> Consider adding GraphQL and Next.js to boost your frontend profile.
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-sm text-green-800 dark:text-green-400">
                                        <strong>Strong Match:</strong> Your React and Node.js skills are highly sought after in the current market.
                                    </p>
                                </div>
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-400">
                                        <strong>Certification Tip:</strong> AWS certification could increase your cloud technology credibility.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ResumeParser;