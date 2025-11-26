import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import User from '../models/user.model.js';

describe('User Authentication', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const userData = {
            fullname: 'Test User',
            email: 'test@example.com',
            phoneNumber: '1234567890',
            password: 'password123',
            role: 'student'
        };

        const response = await request(app)
            .post('/api/v1/user/register')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Account created successfully.');
    });

    it('should not register user with existing email', async () => {
        const userData = {
            fullname: 'Test User',
            email: 'test@example.com',
            phoneNumber: '1234567890',
            password: 'password123',
            role: 'student'
        };

        await request(app).post('/api/v1/user/register').send(userData);
        
        const response = await request(app)
            .post('/api/v1/user/register')
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('should login with valid credentials', async () => {
        const userData = {
            fullname: 'Test User',
            email: 'test@example.com',
            phoneNumber: '1234567890',
            password: 'password123',
            role: 'student'
        };

        await request(app).post('/api/v1/user/register').send(userData);

        const loginData = {
            email: 'test@example.com',
            password: 'password123',
            role: 'student'
        };

        const response = await request(app)
            .post('/api/v1/user/login')
            .send(loginData);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user).toBeDefined();
    });
});