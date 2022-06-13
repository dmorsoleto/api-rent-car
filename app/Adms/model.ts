import { Document, Schema, model, Types } from "mongoose"
import { schemaOptions } from "../utils/extends"

export interface IAdmsScheme extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
  }

const AdmsSchema = new Schema({
     username: {
        type: String,
        required: true,
        unique: true,
        length: 100
     },
     password: {
        type: String,
        required: true,
        length: 255
     }
}, schemaOptions)

export default model<IAdmsScheme>("Admins", AdmsSchema)