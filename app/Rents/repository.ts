import RentsSchema from "./model"

class RentsRepository {
    
    async findOne(_id: string) {
        const hasCar = await RentsSchema.findOne({_id}).lean()
        return hasCar
    }
}

export default new RentsRepository