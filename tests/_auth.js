const mongoose = require("mongoose");
const supertest = require('supertest');

class AuthTest {
    constructor(app) {
        describe('Collections Auth', () => {

            test('Error required parameters', async() => {
                const response = await supertest(app)
                    .post('/auth')

                expect(response.statusCode).toBe(400)
            })

            test('User not found', async() => {
                const response = await supertest(app)
                    .post('/auth')
                    .send({ username: "abc", password: "123" })

                expect(response.statusCode).toBe(400)
            })

            test('User not found', async() => {
                const response = await supertest(app)
                    .post('/auth')
                    .send({ username: "abc", password: "123" })

                expect(response.statusCode).toBe(400)
            })

            test('User or password invalid', async() => {
                const responseEdit = await supertest(app)
                    .post('/auth')
                    .send({ username: "teste", password: "123" })

                expect(responseEdit.statusCode).toBe(400)
            });
        });
    }
}

module.exports = AuthTest