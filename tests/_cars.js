const { default: CarsRepository } = require('../app/Cars/repository');
const mongoose = require("mongoose");
const supertest = require('supertest');

class CarsTest {
    constructor(app, auth) {
        describe('Collections Cars', () => {
            const objCar = {
                "_id": mongoose.Types.ObjectId("628d6a11edadd0f4c04fa93e"),
                "name": "Teste",
                "brand": "Teste",
                "year": "2022",
                "model": "Teste",
                "price": 49.90
            }

            test('GET /get/cars', async() => {
                const response = await supertest(app)
                    .get('/get/cars')
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });

            test('GET /add/car', async() => {
                const response = await supertest(app)
                    .post('/add/car')
                    .send(objCar)
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });

            test('GET /edit/car', async() => {
                await CarsRepository.createCarsFromObj(objCar)
                const responseEdit = await supertest(app)
                    .put('/edit/car')
                    .send({...objCar, "name": "Teste 2" })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(responseEdit.statusCode).toBe(200)
            });

            test('GET /delete/car', async() => {
                const response = await supertest(app)
                    .delete('/delete/car')
                    .send({ "_id": "628d6a11edadd0f4c04fa93e" })
                    .set('Authorization', `Bearer ${auth.token}`)

                expect(response.statusCode).toBe(200)
            });
        });
    }
}

module.exports = CarsTest