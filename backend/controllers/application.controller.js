import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import { sendJobApplicationNotification, sendApplicationStatusUpdate } from '../services/emailService.js';


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        const { coverLetter } = req.body;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            });
        }
        
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }
        
        const job = await Job.findById(jobId).populate('company').populate('created_by');
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        
        const applicant = await User.findById(userId);
        
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            coverLetter,
            timeline: [{
                status: 'applied',
                date: new Date(),
                note: 'Application submitted'
            }]
        });
        
        job.application.push(newApplication._id);
        await job.save();
        
        // Send email notification to recruiter
        try {
            await sendJobApplicationNotification(
                job.created_by.email,
                job.title,
                applicant.fullname
            );
        } catch (emailError) {
            console.error('Email notification failed:', emailError);
        }
        
        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        });
    } catch (error) {
        console.error("Error in apply job:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            option: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                option: { sort: { createdAt: -1 } },
            }
        })
        if (!application) {
            return res.status(404).json({
                message: "No applications",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error)

    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status, notes, interviewDate } = req.body;
        const applicationId = req.params.id;
        const updatedBy = req.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }
        
        const application = await Application.findById(applicationId)
            .populate('job')
            .populate('applicant');
            
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }
        
        // Update application
        application.status = status.toLowerCase();
        if (notes) application.notes = notes;
        if (interviewDate) application.interviewDate = new Date(interviewDate);
        
        // Add to timeline
        application.timeline.push({
            status: status.toLowerCase(),
            date: new Date(),
            note: notes || `Status updated to ${status}`,
            updatedBy
        });
        
        await application.save();
        
        // Send email notification to applicant
        try {
            const job = await Job.findById(application.job._id).populate('company');
            await sendApplicationStatusUpdate(
                application.applicant.email,
                job.title,
                status.toLowerCase(),
                job.company.name
            );
        } catch (emailError) {
            console.error('Email notification failed:', emailError);
        }

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });
    } catch (error) {
        console.error('Update status error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};