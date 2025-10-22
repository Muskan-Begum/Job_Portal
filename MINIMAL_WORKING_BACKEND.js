import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Simple User Schema
const userSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

// Simple Job Schema
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    salary: String,
    description: String
});

const Job = mongoose.model('Job', jobSchema);

// Routes
app.post('/api/v1/user/register', async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            fullname,
            email,
            password: hashedPassword,
            role
        });
        
        await user.save();
        
        res.json({ success: true, message: "Registration successful" });
    } catch (error) {
        res.json({ success: false, message: "Registration failed" });
    }
});

app.post('/api/v1/user/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        
        if (user.role !== role) {
            return res.json({ success: false, message: "Role mismatch" });
        }
        
        const token = jwt.sign({ userId: user._id }, 'secret123', { expiresIn: '1d' });
        
        res.cookie('token', token, { httpOnly: true });
        res.json({
            success: true,
            message: `Welcome ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.json({ success: false, message: "Login failed" });
    }
});

app.get('/api/v1/job/get', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json({ success: true, jobs });
    } catch (error) {
        res.json({ success: false, jobs: [] });
    }
});

// Create sample data
const createSampleData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Job.deleteMany({});
        
        // Create test user
        const hashedPassword = await bcrypt.hash('123456', 10);
        await User.create({
            fullname: 'Test Student',
            email: 'student@test.com',
            password: hashedPassword,
            role: 'student'
        });
        
        // Create sample jobs
        await Job.create([
            {
                title: 'Frontend Developer',
                company: 'TechCorp',
                location: 'San Francisco',
                salary: '$70k - $90k',
                description: 'Build amazing UIs with React'
            },
            {
                title: 'Backend Developer',
                company: 'StartupXYZ',
                location: 'New York',
                salary: '$80k - $100k',
                description: 'Build scalable APIs with Node.js'
            },
            {
                title: 'Full Stack Developer',
                company: 'DevCorp',
                location: 'Remote',
                salary: '$90k - $120k',
                description: 'Work on both frontend and backend'
            }
        ]);
        
        console.log('✅ Sample data created');
    } catch (error) {
        console.log('Sample data creation failed:', error);
    }
};

// Start server
const PORT = 8000;
app.listen(PORT, async () => {
    try {
        await mongoose.connect('mongodb+srv://jyotrimayeeswain017:lisa13@cluster0.xefrunn.mongodb.net/jobportal');
        console.log('✅ MongoDB connected');
        console.log(`✅ Server running on port ${PORT}`);
        
        // Create sample data
        setTimeout(createSampleData, 1000);
        
    } catch (error) {
        console.log('❌ Connection failed:', error);
    }
});