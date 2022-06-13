"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const rawData = require('../../data/cars.json');
class CarsRepository {
    async findOne(_id) {
        const hasCar = await model_1.default.findOne({ _id }).lean();
        return hasCar;
    }
    async createCarsDummyData() {
        const hasCars = await model_1.default.find({});
        if (hasCars.length > 0) {
            return;
        }
        for (let index = 0; index < rawData.length; index++) {
            const element = rawData[index];
            await model_1.default.create(element);
        }
    }
    async createCarsFromObj(objCreate) {
        await model_1.default.create(objCreate);
        return true;
    }
}
exports.default = new CarsRepository;
