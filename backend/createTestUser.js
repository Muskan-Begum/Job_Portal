import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.model.js';

dotenv.config();

const createTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Delete existing test user
        await User.deleteOne({ email: 'student@test.com' });

        // Create simple test user
        const hashedPassword = await bcrypt.hash('123456', 12);
        
        const user = await User.create({
            fullname: 'Test Student',
            email: 'student@test.com',
            phoneNumber: '1234567890',
            password: hashedPassword,
            role: 'student',
            profile: {
                bio: 'Test student account',
                skills: ['JavaScript', 'React'],
                location: 'Test City'
            }
        });

        console.log('✅ Test user created successfully!');
        console.log('Email:', user.email);
        console.log('Password: 123456');
        console.log('Role:', user.role);
        
        // Test the password
        const isMatch = await bcrypt.compare('123456', user.password);
        console.log('Password test:', isMatch ? '✅ Valid' : '❌ Invalid');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

createTestUser();