import { convertPasswordToBcrypt } from "../helpers/adms"
import AdmsSchema, { IAdmsScheme } from "./model"
import { TObjFilterAdm } from "./types"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rawData = require('../../data/adms.json')

class AdmsRepository {
    async findOne(objFilter:TObjFilterAdm) {
        const obj = await AdmsSchema.findOne(objFilter).lean()
        return obj
    }

    async createAdminsFromObj(objCreate: IAdmsScheme) {
        await AdmsSchema.create(objCreate)
        return true
    }

    async createAdmsDummyData() {
        const hasAdmins = await AdmsSchema.find({})
        if(hasAdmins.length > 0) {    
            return
        }        
        for (let index = 0; index < rawData.length; index++) {
            const element = rawData[index]
            const passwordEncrypted = await convertPasswordToBcrypt(element.password)      
            await AdmsSchema.create({...element, password: passwordEncrypted})
        }
    }
}

export default new AdmsRepository