import CarsSchema from "./model"
import { Request, Response } from 'express'

class CarsController {

    async getAll(req: Request, res: Response) {
        try {
            const allCars = await CarsSchema.find({}).lean()

            return res.json({
                success: 1,
                cars: allCars
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async addCar(req: Request, res: Response) {
        const { name, brand, year, model, price } = req.body
        if (!name || !brand || !year || !model || !price) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {
            const carSaved = await CarsSchema.create({
                name,
                brand,
                year, 
                model,
                price
            })

            return res.json({
                success: 1,
                cars: carSaved._id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async editCar(req: Request, res: Response) {
        const { _id, name, brand, year, model, price } = req.body
        if (!_id || !name || !brand || !year || !model || !price) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {
            await CarsSchema.updateOne({_id: _id}, {
                name,
                brand,
                year, 
                model,
                price
            })

            return res.json({
                success: 1,
                car: _id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async deleteCar(req: Request, res: Response) {
        const { _id} = req.body
        if (!_id) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {
            await CarsSchema.deleteOne({_id})

            return res.json({
                success: 1,
                car: _id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }
}

export default new CarsController()