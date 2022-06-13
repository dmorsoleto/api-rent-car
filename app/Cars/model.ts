import { Document, Schema, model, Types } from "mongoose"
import { schemaOptions } from "../utils/extends"

export interface ICarsScheme extends Document {
    _id: Types.ObjectId;
    name: string;
    brand: string;
    year: string;
    model: string;
    price: number;
  }

const CarsSchema = new Schema({
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
}, schemaOptions)

CarsSchema.path('price').get(function (num: number) {
    return (num / 100).toFixed(2)
})

CarsSchema.path('price').set(function (num: number) {
    return num * 100
})

export default model<ICarsScheme>("Cars", CarsSchema)