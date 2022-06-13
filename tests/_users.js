const { default: UsersRepository } = require('../app/Users/repository');
const mongoose = require("mongoose");
const supertest = require('supertest');

class UsersTest {
    constructor(app, auth) {
        describe('Collections Users', () => {
            const objUser = {
                "_id": mongoose.Types.ObjectId("628d6a11edadd0f4c04fa93e"),
                "name": "Teste User",
                "email": "teste@qp1.com",
                "password": "123456"
            }

            test('GET /get/users', async() => {
                const response = await supertest(app)
                    .get('/get/users')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            })

            test('GET /add/user', async() => {
                const response = await supertest(app)
                    .post('/add/user')
                    .send(objUser)
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });

            test('GET /edit/user', async() => {
                await UsersRepository.createUsersFromObj({...objUser, "email": "teste1@qp1.com" })
                const responseEdit = await supertest(app)
                    .put('/edit/user')
                    .send({...objUser, "name": "Teste 2" })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(responseEdit.statusCode).toBe(200)
            });

            test('GET /delete/user', async() => {
                const response = await supertest(app)
                    .delete('/delete/user')
                    .send({ "_id": "628d6a11edadd0f4c04fa93e" })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });
        });
    }
}

module.exports = UsersTest