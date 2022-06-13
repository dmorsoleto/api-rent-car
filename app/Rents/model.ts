import { Document, Schema, model, Types } from "mongoose"
import { schemaOptions } from "../utils/extends"

export interface IRentsScheme extends Document {
    _id: Types.ObjectId;
    rentStart: number;
    rentEnd: number;
    total: number;
    status: string;
    users_idusers: Types.ObjectId;
    cars_idcars: Types.ObjectId;
  }

const RentsSchema = new Schema({
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
        type: Types.ObjectId,
        ref: 'Users'
    },
    cars_idcars: {
        type: Types.ObjectId,
        ref: 'Cars'
    },
}, schemaOptions)

RentsSchema.path('total').get(function (num: number) {
    return (num / 100).toFixed(2)
})

RentsSchema.path('total').set(function (num: number) {
    return num * 100
})

export default model<IRentsScheme>("Rents", RentsSchema)