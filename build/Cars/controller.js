"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
class CarsController {
    async getAll(req, res) {
        try {
            const allCars = await model_1.default.find({}).lean();
            return res.json({
                success: 1,
                cars: allCars
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async addCar(req, res) {
        const { name, brand, year, model, price } = req.body;
        if (!name || !brand || !year || !model || !price)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            const carSaved = await model_1.default.create({
                name,
                brand,
                year,
                model,
                price
            });
            return res.json({
                success: 1,
                cars: carSaved._id
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async editCar(req, res) {
        const { _id, name, brand, year, model, price } = req.body;
        if (!_id || !name || !brand || !year || !model || !price)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            await model_1.default.updateOne({ _id: _id }, {
                name,
                brand,
                year,
                model,
                price
            });
            return res.json({
                success: 1,
                car: _id
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
    async deleteCar(req, res) {
        const { _id } = req.body;
        if (!_id)
            return res.status(200).json({ error: 1, message: 'Required parameters not found!' });
        try {
            await model_1.default.deleteOne({ _id });
            return res.json({
                success: 1,
                car: _id
            });
        }
        catch (err) {
            return res.json({
                error: 1,
                data: err
            });
        }
    }
}
exports.default = new CarsController();
