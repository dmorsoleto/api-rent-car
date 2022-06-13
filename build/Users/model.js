"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const extends_1 = require("../utils/extends");
const UsersSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        length: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        length: 100
    },
    password: {
        type: String,
        required: true,
        length: 255
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
}, extends_1.schemaOptions);
exports.default = (0, mongoose_1.model)("Users", UsersSchema);
