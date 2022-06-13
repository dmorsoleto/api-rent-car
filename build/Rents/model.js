"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const extends_1 = require("../utils/extends");
const RentsSchema = new mongoose_1.Schema({
    rentStart: {
        type: Number,
        required: true
    },
    rentEnd: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    users_idusers: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Users'
    },
    cars_idcars: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Cars'
    },
}, extends_1.schemaOptions);
RentsSchema.path('total').get(function (num) {
    return (num / 100).toFixed(2);
});
RentsSchema.path('total').set(function (num) {
    return num * 100;
});
exports.default = (0, mongoose_1.model)("Rents", RentsSchema);
