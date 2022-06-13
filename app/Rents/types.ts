import { Types } from 'mongoose'

export type TObjFilterRent = {
    rentStart?: number;
    rentEnd?: number;
    total?: number;
    users_idusers?: Types.ObjectId;
    cars_idcars?: Types.ObjectId;
}