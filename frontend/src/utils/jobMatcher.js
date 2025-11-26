// Advanced job matching algorithm
export class JobMatcher {
    constructor() {
        this.weights = {
            skills: 0.4,
            experience: 0.25,
            location: 0.15,
            salary: 0.1,
            jobType: 0.1
        };
    }

    calculateMatch(userProfile, job) {
        let totalScore = 0;
        let maxScore = 0;

        // Skills matching (40% weight)
        const skillsScore = this.calculateSkillsMatch(userProfile.skills || [], job.skills || []);
        totalScore += skillsScore * this.weights.skills;
        maxScore += this.weights.skills;

        // Experience matching (25% weight)
        const experienceScore = this.calculateExperienceMatch(userProfile.experience || 0, job.experienceLevel || 0);
        totalScore += experienceScore * this.weights.experience;
        maxScore += this.weights.experience;

        // Location matching (15% weight)
        const locationScore = this.calculateLocationMatch(userProfile.preferredLocations || [], job.location, job.isRemote);
        totalScore += locationScore * this.weights.location;
        maxScore += this.weights.location;

        // Salary matching (10% weight)
        const salaryScore = this.calculateSalaryMatch(userProfile.expectedSalary, job.salary);
        totalScore += salaryScore * this.weights.salary;
        maxScore += this.weights.salary;

        // Job type matching (10% weight)
        const jobTypeScore = this.calculateJobTypeMatch(userProfile.preferredJobTypes || [], job.jobType);
        totalScore += jobTypeScore * this.weights.jobType;
        maxScore += this.weights.jobType;

        return Math.round((totalScore / maxScore) * 100);
    }

    calculateSkillsMatch(userSkills, jobSkills) {
        if (!userSkills.length || !jobSkills.length) return 0;

        const userSkillsLower = userSkills.map(s => s.toLowerCase());
        const jobSkillsLower = jobSkills.map(s => s.toLowerCase());
        
        let matches = 0;
        let partialMatches = 0;

        jobSkillsLower.forEach(jobSkill => {
            const exactMatch = userSkillsLower.includes(jobSkill);
            if (exactMatch) {
                matches++;
            } else {
                // Check for partial matches (e.g., "React" matches "ReactJS")
                const partialMatch = userSkillsLower.some(userSkill => 
                    userSkill.includes(jobSkill) || jobSkill.includes(userSkill)
                );
                if (partialMatch) {
                    partialMatches++;
                }
            }
        });

        const exactScore = matches / jobSkillsLower.length;
        const partialScore = (partialMatches * 0.5) / jobSkillsLower.length;
        
        return Math.min(1, exactScore + partialScore);
    }

    calculateExperienceMatch(userExperience, requiredExperience) {
        if (requiredExperience === 0) return 1;
        
        const difference = Math.abs(userExperience - requiredExperience);
        
        if (userExperience >= requiredExperience) {
            // User has more experience than required
            return Math.max(0.7, 1 - (difference * 0.1));
        } else {
            // User has less experience than required
            return Math.max(0, 1 - (difference * 0.2));
        }
    }

    calculateLocationMatch(preferredLocations, jobLocation, isRemote) {
        if (isRemote) return 1;
        if (!preferredLocations.length) return 0.5;
        
        const locationMatch = preferredLocations.some(location => 
            location.toLowerCase().includes(jobLocation.toLowerCase()) ||
            jobLocation.toLowerCase().includes(location.toLowerCase())
        );
        
        return locationMatch ? 1 : 0.2;
    }

    calculateSalaryMatch(expectedSalary, jobSalary) {
        if (!expectedSalary || !jobSalary) return 0.5;
        
        const jobMin = jobSalary.min || jobSalary;
        const jobMax = jobSalary.max || jobSalary;
        
        if (expectedSalary >= jobMin && expectedSalary <= jobMax) {
            return 1;
        } else if (expectedSalary < jobMin) {
            const difference = (jobMin - expectedSalary) / jobMin;
            return Math.max(0.3, 1 - difference);
        } else {
            const difference = (expectedSalary - jobMax) / jobMax;
            return Math.max(0.1, 1 - difference);
        }
    }

    calculateJobTypeMatch(preferredTypes, jobType) {
        if (!preferredTypes.length) return 0.5;
        return preferredTypes.includes(jobType) ? 1 : 0.2;
    }

    getRecommendations(userProfile, jobs, limit = 10) {
        const scoredJobs = jobs.map(job => ({
            ...job,
            matchScore: this.calculateMatch(userProfile, job)
        }));

        return scoredJobs
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, limit);
    }

    getMatchReasons(userProfile, job) {
        const reasons = [];
        
        // Skills match
        const userSkills = userProfile.skills || [];
        const jobSkills = job.skills || [];
        const matchingSkills = jobSkills.filter(jobSkill => 
            userSkills.some(userSkill => 
                userSkill.toLowerCase().includes(jobSkill.toLowerCase()) ||
                jobSkill.toLowerCase().includes(userSkill.toLowerCase())
            )
        );
        
        if (matchingSkills.length > 0) {
            reasons.push(`Skills match: ${matchingSkills.join(', ')}`);
        }
        
        // Experience match
        if (userProfile.experience >= (job.experienceLevel || 0)) {
            reasons.push('Experience requirement met');
        }
        
        // Location match
        if (job.isRemote || (userProfile.preferredLocations || []).includes(job.location)) {
            reasons.push(job.isRemote ? 'Remote work available' : 'Preferred location');
        }
        
        return reasons;
    }
}

export const jobMatcher = new JobMatcher();