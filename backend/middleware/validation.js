import { body } from 'express-validator';

export const validateRegistration = [
    body('fullname').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['student', 'recruiter']).withMessage('Role must be student or recruiter')
];

export const validateJobPost = [
    body('title').trim().isLength({ min: 3 }).withMessage('Job title must be at least 3 characters'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('skills').isArray({ min: 1 }).withMessage('At least one skill is required'),
    body('salary.min').isNumeric().withMessage('Minimum salary must be a number'),
    body('jobType').isIn(['full-time', 'part-time', 'contract', 'internship']).withMessage('Invalid job type')
];

export const validateApplicationStatus = [
    body('status').isIn(['applied', 'reviewing', 'shortlisted', 'interview', 'offered', 'accepted', 'rejected'])
        .withMessage('Invalid status')
];