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
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});

        // Create sample users
        const hashedPassword = await bcrypt.hash('123456', 12);
        
        const users = await User.create([
            {
                fullname: 'John Student',
                email: 'student@test.com',
                phoneNumber: '1234567890',
                password: hashedPassword,
                role: 'student',
                profile: {
                    bio: 'Passionate software developer',
                    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                    location: 'New York',
                    experience: 2,
                    expectedSalary: 80000
                }
            },
            {
                fullname: 'Jane Recruiter',
                email: 'recruiter@test.com',
                phoneNumber: '0987654321',
                password: hashedPassword,
                role: 'recruiter',
                profile: {
                    bio: 'Tech recruiter at top companies',
                    location: 'San Francisco'
                }
            },
            {
                fullname: 'Admin User',
                email: 'admin@test.com',
                phoneNumber: '1122334455',
                password: hashedPassword,
                role: 'admin',
                profile: {
                    bio: 'System administrator',
                    location: 'Remote'
                }
            }
        ]);

        // Create sample companies
        const companies = await Company.create([
            {
                name: 'TechCorp Inc',
                description: 'Leading technology company specializing in AI and machine learning',
                website: 'https://techcorp.com',
                location: 'San Francisco, CA',
                userId: users[1]._id
            },
            {
                name: 'StartupXYZ',
                description: 'Fast-growing startup in fintech space',
                website: 'https://startupxyz.com',
                location: 'New York, NY',
                userId: users[1]._id
            },
            {
                name: 'Global Solutions',
                description: 'International consulting firm',
                website: 'https://globalsolutions.com',
                location: 'Remote',
                userId: users[1]._id
            }
        ]);

        // Create sample jobs
        await Job.create([
            {
                title: 'Frontend Developer',
                description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and modern web technologies.',
                requirements: '3+ years React experience, JavaScript ES6+, CSS/SASS, Git',
                skills: ['React', 'JavaScript', 'CSS', 'HTML'],
                salary: { min: 70000, max: 90000 },
                location: 'San Francisco, CA',
                jobType: 'full-time',
                experienceLevel: 3,
                company: companies[0]._id,
                created_by: users[1]._id,
                position: 2,
                isRemote: false
            },
            {
                title: 'Full Stack Developer',
                description: 'Join our dynamic team as a Full Stack Developer. Work on both frontend and backend technologies to build scalable web applications.',
                requirements: 'Node.js experience, React/Vue.js, Database knowledge, API development',
                skills: ['Node.js', 'React', 'MongoDB', 'Express'],
                salary: { min: 80000, max: 120000 },
                location: 'New York, NY',
                jobType: 'full-time',
                experienceLevel: 4,
                company: companies[1]._id,
                created_by: users[1]._id,
                position: 3,
                isRemote: true
            },
            {
                title: 'Python Developer',
                description: 'Seeking a Python Developer to work on data analysis and web development projects. Experience with Django/Flask preferred.',
                requirements: 'Python 3.x, Django/Flask, SQL databases, REST APIs',
                skills: ['Python', 'Django', 'PostgreSQL', 'REST API'],
                salary: { min: 75000, max: 100000 },
                location: 'Remote',
                jobType: 'full-time',
                experienceLevel: 2,
                company: companies[2]._id,
                created_by: users[1]._id,
                position: 2,
                isRemote: true
            },
            {
                title: 'UI/UX Designer',
                description: 'Creative UI/UX Designer needed to design intuitive and engaging user experiences for our web and mobile applications.',
                requirements: 'Figma/Sketch, User research, Prototyping, Design systems',
                skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
                salary: { min: 65000, max: 85000 },
                location: 'San Francisco, CA',
                jobType: 'full-time',
                experienceLevel: 2,
                company: companies[0]._id,
                created_by: users[1]._id,
                position: 1,
                isRemote: false
            },
            {
                title: 'DevOps Engineer',
                description: 'DevOps Engineer to manage our cloud infrastructure and deployment pipelines. AWS experience required.',
                requirements: 'AWS/Azure, Docker/Kubernetes, CI/CD, Linux',
                skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
                salary: { min: 90000, max: 130000 },
                location: 'Remote',
                jobType: 'full-time',
                experienceLevel: 4,
                company: companies[1]._id,
                created_by: users[1]._id,
                position: 1,
                isRemote: true
            },
            {
                title: 'Data Scientist',
                description: 'Data Scientist to analyze large datasets and build machine learning models. Python and R experience required.',
                requirements: 'Python/R, Machine Learning, Statistics, SQL',
                skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
                salary: { min: 95000, max: 140000 },
                location: 'New York, NY',
                jobType: 'full-time',
                experienceLevel: 3,
                company: companies[2]._id,
                created_by: users[1]._id,
                position: 2,
                isRemote: true
            }
        ]);

        console.log('✅ Sample data created successfully!');
        console.log('\n📧 Test Accounts:');
        console.log('Student: student@test.com / 123456');
        console.log('Recruiter: recruiter@test.com / 123456');
        console.log('Admin: admin@test.com / 123456');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();