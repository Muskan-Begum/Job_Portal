import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Search, MapPin, DollarSign, Briefcase } from 'lucide-react';

const AdvancedSearch = ({ onSearch, onReset }) => {
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        jobType: '',
        minSalary: '',
        maxSalary: '',
        experience: '',
        skills: '',
        isRemote: ''
    });

    const handleInputChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    const handleReset = () => {
        setFilters({
            keyword: '',
            location: '',
            jobType: '',
            minSalary: '',
            maxSalary: '',
            experience: '',
            skills: '',
            isRemote: ''
        });
        onReset();
    };

    return (
        <Card className="w-full mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Advanced Job Search
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Keywords</label>
                        <Input
                            placeholder="Job title, company..."
                            value={filters.keyword}
                            onChange={(e) => handleInputChange('keyword', e.target.value)}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Location
                        </label>
                        <Input
                            placeholder="City, state..."
                            value={filters.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            Job Type
                        </label>
                        <Select value={filters.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Full Time</SelectItem>
                                <SelectItem value="part-time">Part Time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Experience (Years)</label>
                        <Select value={filters.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Entry Level</SelectItem>
                                <SelectItem value="1">1+ Years</SelectItem>
                                <SelectItem value="3">3+ Years</SelectItem>
                                <SelectItem value="5">5+ Years</SelectItem>
                                <SelectItem value="10">10+ Years</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Min Salary
                        </label>
                        <Input
                            type="number"
                            placeholder="50000"
                            value={filters.minSalary}
                            onChange={(e) => handleInputChange('minSalary', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Max Salary</label>
                        <Input
                            type="number"
                            placeholder="150000"
                            value={filters.maxSalary}
                            onChange={(e) => handleInputChange('maxSalary', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Skills</label>
                        <Input
                            placeholder="React, Node.js, Python..."
                            value={filters.skills}
                            onChange={(e) => handleInputChange('skills', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Remote Work</label>
                        <Select value={filters.isRemote} onValueChange={(value) => handleInputChange('isRemote', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Remote Only</SelectItem>
                                <SelectItem value="false">On-site Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <Button onClick={handleSearch} className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                        <Search className="h-4 w-4 mr-2" />
                        Search Jobs
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        Reset Filters
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdvancedSearch;