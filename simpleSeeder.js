import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Company from './models/company.model.js';
import Job from './models/job.model.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});

        // Create test users
        const hashedPassword = await bcrypt.hash('123456', 12);
        
        const student = await User.create({
            fullname: 'John Student',
            email: 'student@test.com',
            phoneNumber: '1234567890',
            password: hashedPassword,
            role: 'student',
            profile: {
                bio: 'Software developer',
                skills: ['JavaScript', 'React', 'Node.js'],
                location: 'New York'
            }
        });

        const recruiter = await User.create({
            fullname: 'Jane Recruiter',
            email: 'recruiter@test.com',
            phoneNumber: '0987654321',
            password: hashedPassword,
            role: 'recruiter',
            profile: {
                bio: 'Tech recruiter',
                location: 'San Francisco'
            }
        });

        // Create companies
        const company1 = await Company.create({
            name: 'TechCorp',
            description: 'Leading tech company',
            website: 'https://techcorp.com',
            location: 'San Francisco, CA',
            userId: recruiter._id
        });

        const company2 = await Company.create({
            name: 'StartupXYZ',
            description: 'Fast-growing startup',
            website: 'https://startupxyz.com',
            location: 'New York, NY',
            userId: recruiter._id
        });

        // Create jobs
        await Job.create({
            title: 'Frontend Developer',
            description: 'Build amazing user interfaces with React',
            requirements: 'React, JavaScript, CSS experience required',
            skills: ['React', 'JavaScript', 'CSS'],
            salary: { min: 70000, max: 90000 },
            location: 'San Francisco, CA',
            jobType: 'full-time',
            experienceLevel: 2,
            company: company1._id,
            created_by: recruiter._id,
            position: 2
        });

        await Job.create({
            title: 'Full Stack Developer',
            description: 'Work on both frontend and backend systems',
            requirements: 'Node.js, React, MongoDB experience',
            skills: ['Node.js', 'React', 'MongoDB'],
            salary: { min: 80000, max: 120000 },
            location: 'New York, NY',
            jobType: 'full-time',
            experienceLevel: 3,
            company: company2._id,
            created_by: recruiter._id,
            position: 1,
            isRemote: true
        });

        await Job.create({
            title: 'Python Developer',
            description: 'Develop backend services with Python',
            requirements: 'Python, Django, PostgreSQL',
            skills: ['Python', 'Django', 'PostgreSQL'],
            salary: { min: 75000, max: 100000 },
            location: 'Remote',
            jobType: 'full-time',
            experienceLevel: 2,
            company: company1._id,
            created_by: recruiter._id,
            position: 1,
            isRemote: true
        });

        console.log('✅ Sample data created successfully!');
        console.log('\n📧 Test Accounts:');
        console.log('Student: student@test.com / 123456');
        console.log('Recruiter: recruiter@test.com / 123456');
        console.log('\n🎯 Available Jobs: 3');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedData();