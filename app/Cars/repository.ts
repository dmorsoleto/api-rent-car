import CarsSchema, { ICarsScheme } from "./model"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rawData = require('../../data/cars.json')

class CarsRepository {
    async findOne(_id: string) {
        const hasCar = await CarsSchema.findOne({_id}).lean()
        return hasCar
    }

    async createCarsDummyData() {
        const hasCars = await CarsSchema.find({})
        if(hasCars.length > 0) {    
            return
        }
        for (let index = 0; index < rawData.length; index++) {
            const element = rawData[index]             
            await CarsSchema.create(element)
        }
    }

    async createCarsFromObj(objCreate: ICarsScheme) {
        await CarsSchema.create(objCreate)
        return true
    }
}

export default new CarsRepository