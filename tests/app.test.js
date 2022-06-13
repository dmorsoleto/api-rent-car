const supertest = require('supertest');
const Server = require('../app/index');
const app = new Server.default(true).getExpress()
const mongoose = require("mongoose");
const CarsTest = require('./_cars');
const UsersTest = require('./_users');
const RentsTest = require('./_rents');
const MessagesTest = require('./_messages');
const AdmsTest = require('./_adms');
const AuthTest = require('./_auth');
const databaseName = "test";

const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    DB_HOST,
} = process.env

let url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${DB_HOST}:7017/${databaseName}?authSource=admin`
if (process.env.NODE_ENV === 'test-ci') {
    url = `mongodb://mongo:27017/${databaseName}?authSource=admin`
}

const auth = {};

beforeAll(async() => {
    mongoose.connect(url, { useNewUrlParser: true }).then(async() => {
        const collections = await mongoose.connection.db.collections();
        for (let connection of collections) {
            await connection.deleteMany({});
        }
    });
    const response = await supertest(app)
        .post('/auth/test/ci')
        .send({
            username: 'testeci',
            password: '123456'
        })
    expect(response.statusCode).toBe(200)
    auth.token = response.body.token

});

new AuthTest(app)
new AdmsTest(app, auth)
new UsersTest(app, auth)
new CarsTest(app, auth)
new RentsTest(app, auth)
new MessagesTest(app, auth)