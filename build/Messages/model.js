"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const extends_1 = require("../utils/extends");
const MessagesSchema = new mongoose_1.Schema({
    uuid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true,
    }
}, extends_1.schemaOptions);
MessagesSchema.index({ uuid: 1, name: 1 });
exports.default = (0, mongoose_1.model)("Messages", MessagesSchema);
