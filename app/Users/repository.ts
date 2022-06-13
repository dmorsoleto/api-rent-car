import UsersSchema, { IUsersScheme } from "./model"

// eslint-disable-next-line @typescript-eslint/no-var-requires
class UsersRepository {
    async findOne(_id: string) {
        const hasCar = await UsersSchema.findOne({_id}).lean()
        return hasCar
    }

    async createUsersFromObj(objCreate: IUsersScheme) {
        await UsersSchema.create(objCreate)
        return true
    }
}

export default new UsersRepository