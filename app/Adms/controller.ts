import AdmsSchema from './model'
import { Request, Response } from 'express'

import { TObjEditAdm } from './types'
import { convertPasswordToBcrypt } from '../helpers/adms'

class AdmsController {
    
    async getAll(req: Request, res: Response) {
    
        try {
            const adms = await AdmsSchema.find({})

            return res.json({
                success: 1,
                adms
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async addAdmin(req: Request, res: Response) {
        const { username, password } = req.body
        if (!username || !password) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {
            const passwordEncrypted = await convertPasswordToBcrypt(password)
            const userSaved = await AdmsSchema.create({
                username,
                password: passwordEncrypted
            })

            return res.json({
                success: 1,
                admin: userSaved._id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async editAdmin(req: Request, res: Response) {
        const { _id, username, password } = req.body
        if (!_id || !username) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })
        
        try {
            const objToUpdate: TObjEditAdm = {
                username
            }

            if(password) {
                const passwordEncrypted = await convertPasswordToBcrypt(password)
                objToUpdate.password = passwordEncrypted
            }

            await AdmsSchema.updateOne({_id},objToUpdate)

            return res.json({
                success: 1,
                admin: _id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        const { _id } = req.body
        if (!_id) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })
        
        try {
            await AdmsSchema.deleteOne({_id})

            return res.json({
                success: 1,
                admin: _id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }
}

export default new AdmsController()