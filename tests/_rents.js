const mongoose = require("mongoose");
const supertest = require('supertest');
const { default: CarsRepository } = require("../app/Cars/repository");
const { default: UsersRepository } = require("../app/Users/repository");

const objCar = {
    "_id": mongoose.Types.ObjectId("628fc03af29535b497f00178"),
    "name": "Teste Rent",
    "brand": "Teste Rent",
    "year": "2022",
    "model": "Rent",
    "price": 49.90
}

const objUser = {
    "_id": mongoose.Types.ObjectId("628c1a5eb2fcb6a447addd3e"),
    "name": "Daniel Morsoleto",
    "email": "daniel@qp1.org",
    "password": "123456"
}


class RentsTest {
    constructor(app, auth) {
        describe('Collections Rents', () => {
            const objRent = {
                "_id": mongoose.Types.ObjectId("628d6a11edadd0f4c04fa93e"),
                "rentStart": 1653328906000,
                "rentEnd": 1653933706000,
                "idUser": mongoose.Types.ObjectId("628c1a5eb2fcb6a447addd3e"),
                "idCar": mongoose.Types.ObjectId("628fc03af29535b497f00178")
            }

            beforeAll(async() => {
                await CarsRepository.createCarsFromObj(objCar)
                await UsersRepository.createUsersFromObj(objUser)
            })

            test('GET /get/rents', async() => {
                const response = await supertest(app)
                    .get('/get/rents')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            })

            test('Error /add/rent datas invalidas', async() => {
                const response = await supertest(app)
                    .post('/add/rent')
                    .send({...objRent, rentStart: 123, rentEnd: 123 })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual({ error: 1, message: "Datas inseridas não são válidas ou não estão em milesegundos!" })
            });

            test('GET /add/rent', async() => {
                const response = await supertest(app)
                    .post('/add/rent')
                    .send(objRent)
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });

            test('Error /add/rent já tem uma locação ativa', async() => {
                const response = await supertest(app)
                    .post('/add/rent')
                    .send({...objRent, rentStart: 123, rentEnd: 123 })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual({ error: 1, message: "O cliente já tem uma locação ativa." })
            });

            test('GET /cancel/rent', async() => {
                const responseEdit = await supertest(app)
                    .put('/cancel/rent')
                    .send({ "_id": "628d6a11edadd0f4c04fa93e" })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(responseEdit.statusCode).toBe(200)
            });

            test('GET /calcular-dias-restantes', async() => {
                const response = await supertest(app)
                    .get('/calcular-dias-restantes')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });
        });
    }
}

module.exports = RentsTest