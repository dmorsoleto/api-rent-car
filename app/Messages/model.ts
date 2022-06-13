import { Schema, model, Types } from "mongoose"
import { schemaOptions } from "../utils/extends"

const MessagesSchema = new Schema({
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
}, schemaOptions)

MessagesSchema.index({ uuid: 1, name: 1 })

export default model("Messages", MessagesSchema)