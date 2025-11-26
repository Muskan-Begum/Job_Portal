import Job from '../models/job.model.js';
import Application from '../models/application.model.js';

export const getJobRecommendations = async (userId, userProfile) => {
    try {
        const { skills = [], preferredLocations = [], expectedSalary, experience = 0 } = userProfile;
        
        // Get user's applied jobs to exclude them
        const appliedJobs = await Application.find({ applicant: userId }).select('job');
        const appliedJobIds = appliedJobs.map(app => app.job);
        
        // Build recommendation query
        const query = {
            _id: { $nin: appliedJobIds },
            status: 'active'
        };
        
        // Find jobs matching user skills
        const skillBasedJobs = await Job.find({
            ...query,
            skills: { $in: skills }
        }).populate('company').limit(10);
        
        // Find jobs in preferred locations
        const locationBasedJobs = preferredLocations.length > 0 
            ? await Job.find({
                ...query,
                $or: [
                    { location: { $in: preferredLocations } },
                    { isRemote: true }
                ]
            }).populate('company').limit(5)
            : [];
        
        // Find jobs matching experience level
        const experienceBasedJobs = await Job.find({
            ...query,
            experienceLevel: { $lte: experience + 2, $gte: Math.max(0, experience - 1) }
        }).populate('company').limit(5);
        
        // Combine and score recommendations
        const allRecommendations = [...skillBasedJobs, ...locationBasedJobs, ...experienceBasedJobs];
        const uniqueJobs = Array.from(new Map(allRecommendations.map(job => [job._id.toString(), job])).values());
        
        // Score jobs based on match criteria
        const scoredJobs = uniqueJobs.map(job => {
            let score = 0;
            
            // Skill match score (highest weight)
            const matchingSkills = job.skills.filter(skill => 
                skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
            );
            score += matchingSkills.length * 3;
            
            // Location match score
            if (preferredLocations.includes(job.location) || job.isRemote) {
                score += 2;
            }
            
            // Experience match score
            if (job.experienceLevel <= experience + 1 && job.experienceLevel >= experience - 1) {
                score += 1;
            }
            
            // Salary match score
            if (expectedSalary && job.salary.min <= expectedSalary && job.salary.max >= expectedSalary) {
                score += 1;
            }
            
            return { ...job.toObject(), recommendationScore: score };
        });
        
        // Sort by score and return top recommendations
        return scoredJobs
            .sort((a, b) => b.recommendationScore - a.recommendationScore)
            .slice(0, 10);
            
    } catch (error) {
        console.error('Error generating recommendations:', error);
        return [];
    }
};

export const getTrendingJobs = async () => {
    try {
        return await Job.find({ status: 'active' })
            .sort({ views: -1, createdAt: -1 })
            .populate('company')
            .limit(6);
    } catch (error) {
        console.error('Error fetching trending jobs:', error);
        return [];
    }
};