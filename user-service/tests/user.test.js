const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');

// Connect to the database before running tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

// Clean up the database and close the connection after tests
afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User Service', () => {
    // Test for user registration
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    // Test for user login
    it('should login an existing user', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });
});