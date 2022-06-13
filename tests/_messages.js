const { default: CarsRepository } = require('../app/Cars/repository');
const mongoose = require("mongoose");
const supertest = require('supertest');

class MessagesTest {
    constructor(app, auth) {
        describe('Collections Messages', () => {
            test('GET /get/messages', async() => {
                const response = await supertest(app)
                    .get('/get/messages')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });
        });
    }
}

module.exports = MessagesTest