import { Document, Schema, model, Types } from "mongoose"
import { schemaOptions } from "../utils/extends"

export interface IUsersScheme extends Document {
   _id: Types.ObjectId;
   name: string;
   email: string;
   password: string;
   is_active: string;
}

const UsersSchema = new Schema({
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
}, schemaOptions)

export default model<IUsersScheme>("Users", UsersSchema)