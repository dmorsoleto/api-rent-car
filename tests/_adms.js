const mongoose = require("mongoose");
const supertest = require('supertest');

class AdmsTest {
    constructor(app, auth) {
        describe('Collections Admins', () => {
            const objAdmin = {
                "_id": mongoose.Types.ObjectId("628d6a11edadd0f4c04fa93e"),
                "username": "teste",
                "password": "123456"
            }

            test('GET /get/admins', async() => {
                const response = await supertest(app)
                    .get('/get/admins')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            })

            test('POST /add/admin', async() => {
                const response = await supertest(app)
                    .post('/add/admin')
                    .send(objAdmin)
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });

            test('Error /add/admin parameters required', async() => {
                const response = await supertest(app)
                    .post('/add/admin')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual({ error: 1, message: 'Required parameters not found!' })
            });

            test('PUT /edit/admin', async() => {
                const responseEdit = await supertest(app)
                    .put('/edit/admin')
                    .send({...objAdmin, "name": "Teste 2" })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(responseEdit.statusCode).toBe(200)
            });

            test('Error /edit/admin parameters required', async() => {
                const response = await supertest(app)
                    .put('/edit/admin')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual({ error: 1, message: 'Required parameters not found!' })
            });

            test('Delete /delete/admin', async() => {
                const response = await supertest(app)
                    .delete('/delete/admin')
                    .send({ _id: "628d6a11edadd0f4c04fa93e" })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });
        });
    }
}

module.exports = AdmsTest