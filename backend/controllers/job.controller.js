import Job from "../models/job.model.js";
import { getTrendingJobs } from '../services/recommendationService.js';
export const postJob = async (req, res) => {
    try {
        const { title, description, location, requirements, skills, salary, jobType, experience, position, companyId, isRemote, deadline } = req.body;
        const userId = req.id;

        if (!title || !description || !location || !requirements || !skills || !salary || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Required fields are missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
            salary: {
                min: salary.min || salary,
                max: salary.max || salary,
                currency: salary.currency || 'USD'
            },
            location,
            isRemote: isRemote || false,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
            deadline: deadline ? new Date(deadline) : null
        });

        return res.status(201).json({
            message: "New job created successfully",
            success: true,
            job
        });
    } catch (error) {
        console.error('Post job error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const getAlljobs = async (req, res) => {
    try {
        const { 
            keyword = "", 
            location = "", 
            jobType = "", 
            minSalary, 
            maxSalary, 
            experience, 
            skills = "",
            isRemote,
            page = 1,
            limit = 10
        } = req.query;

        const query = { status: 'active' };

        // Keyword search
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { skills: { $in: [new RegExp(keyword, 'i')] } }
            ];
        }

        // Location filter
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        // Job type filter
        if (jobType) {
            query.jobType = jobType;
        }

        // Salary range filter
        if (minSalary || maxSalary) {
            query.$and = query.$and || [];
            if (minSalary) query.$and.push({ 'salary.min': { $gte: Number(minSalary) } });
            if (maxSalary) query.$and.push({ 'salary.max': { $lte: Number(maxSalary) } });
        }

        // Experience filter
        if (experience) {
            query.experienceLevel = { $lte: Number(experience) + 1 };
        }

        // Skills filter
        if (skills) {
            const skillsArray = skills.split(',').map(s => s.trim());
            query.skills = { $in: skillsArray.map(skill => new RegExp(skill, 'i')) };
        }

        // Remote filter
        if (isRemote !== undefined) {
            query.isRemote = isRemote === 'true';
        }

        const skip = (page - 1) * limit;
        const jobs = await Job.find(query)
            .populate('company')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Job.countDocuments(query);

        return res.status(200).json({
            jobs,
            pagination: {
                current: Number(page),
                pages: Math.ceil(total / limit),
                total
            },
            success: true
        });
    } catch (error) {
        console.error('Get all jobs error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate('company')
            .populate({
                path: 'application',
                populate: {
                    path: 'applicant',
                    select: 'fullname email profile.profilePhoto'
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Increment view count
        await Job.findByIdAndUpdate(jobId, { $inc: { views: 1 } });

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error('Get job by ID error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const getAdminjobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:"company",
            createdAt:-1
        })

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })


    } catch (error) {
        console.error('Get admin jobs error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getTrendingJobsController = async (req, res) => {
    try {
        const jobs = await getTrendingJobs();
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error('Get trending jobs error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getJobAnalytics = async (req, res) => {
    try {
        const adminId = req.id;
        
        const totalJobs = await Job.countDocuments({ created_by: adminId });
        const activeJobs = await Job.countDocuments({ created_by: adminId, status: 'active' });
        const totalViews = await Job.aggregate([
            { $match: { created_by: adminId } },
            { $group: { _id: null, totalViews: { $sum: '$views' } } }
        ]);
        
        const jobsByType = await Job.aggregate([
            { $match: { created_by: adminId } },
            { $group: { _id: '$jobType', count: { $sum: 1 } } }
        ]);
        
        const recentJobs = await Job.find({ created_by: adminId })
            .populate('company', 'name')
            .sort({ createdAt: -1 })
            .limit(5);
        
        return res.status(200).json({
            analytics: {
                totalJobs,
                activeJobs,
                totalViews: totalViews[0]?.totalViews || 0,
                jobsByType,
                recentJobs
            },
            success: true
        });
    } catch (error) {
        console.error('Get job analytics error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};