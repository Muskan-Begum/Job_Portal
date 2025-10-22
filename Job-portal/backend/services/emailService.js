import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
} catch (error) {
    console.log('Email service not configured');
}

export const sendEmail = async (to, subject, html) => {
    if (!transporter) {
        console.log('Email service not configured - skipping email');
        return;
    }
    
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email sending failed:', error);
    }
};

export const sendJobApplicationNotification = async (recruiterEmail, jobTitle, applicantName) => {
    if (!transporter) {
        console.log('Email notification skipped - service not configured');
        return;
    }
    
    const subject = `New Application for ${jobTitle}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Job Application</h2>
            <p>Hello,</p>
            <p><strong>${applicantName}</strong> has applied for the position of <strong>${jobTitle}</strong>.</p>
            <p>Please log in to your dashboard to review the application.</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/jobs" 
               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                View Applications
            </a>
        </div>
    `;
    
    await sendEmail(recruiterEmail, subject, html);
};

export const sendApplicationStatusUpdate = async (applicantEmail, jobTitle, status, companyName) => {
    if (!transporter) {
        console.log('Email notification skipped - service not configured');
        return;
    }
    
    const subject = `Application Status Update - ${jobTitle}`;
    const statusMessages = {
        reviewing: 'Your application is being reviewed',
        shortlisted: 'Congratulations! You have been shortlisted',
        interview: 'You have been selected for an interview',
        offered: 'Congratulations! You have received a job offer',
        accepted: 'Welcome to the team!',
        rejected: 'Thank you for your interest'
    };
    
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Application Status Update</h2>
            <p>Hello,</p>
            <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been updated.</p>
            <p><strong>Status:</strong> ${statusMessages[status]}</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" 
               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                View Application
            </a>
        </div>
    `;
    
    await sendEmail(applicantEmail, subject, html);
};