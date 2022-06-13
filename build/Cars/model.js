"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const extends_1 = require("../utils/extends");
const CarsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        length: 100
    },
    brand: {
        type: String,
        required: true,
        length: 100
    },
    year: {
        type: String,
        required: true,
        length: 4
    },
    model: {
        type: String,
        required: true,
        length: 100
    },
    price: {
        type: Number,
        required: true,
    }
}, extends_1.schemaOptions);
CarsSchema.path('price').get(function (num) {
    return (num / 100).toFixed(2);
});
CarsSchema.path('price').set(function (num) {
    return num * 100;
});
exports.default = (0, mongoose_1.model)("Cars", CarsSchema);
