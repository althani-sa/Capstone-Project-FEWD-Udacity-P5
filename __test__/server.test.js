const request = require('supertest');
const { app } = require('../src/server/index');

describe('Test root path', () => {
    test('It should get response with GET', async () => {
        try {
            const response = await request(app).get('/');
            expect(response.statusCode).toEqual(200);
        }
        catch (error) {
            expect(error).toMatch('error');
        }
    });
    test('It should return correct api calls with value', async () => {
        try {
            const response = await request(app).get('/');
            expect(response.statusCode).toEqual(200);
        }
        catch (error) {
            expect(error).toMatch('error');
        }
    })
});