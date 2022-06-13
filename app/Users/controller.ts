import UsersSchema from './model'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { TObjEditUser } from './types'

const saltRounds = 13

class UsersController {
    
    async getAll(req: Request, res: Response) {
    
        try {
            const users = await UsersSchema.find({})

            return res.json({
                success: 1,
                users
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async addUser(req: Request, res: Response) {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {
            const passwordEncrypted = await bcrypt.hash(password, saltRounds)
            const userSaved = await UsersSchema.create({
                name,
                email,
                password: passwordEncrypted
            })

            return res.json({
                success: 1,
                user: userSaved._id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async editUser(req: Request, res: Response) {
        const { _id, name, email, password } = req.body
        if (!_id || !name || !email) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })
        
        try {
            const objToUpdate: TObjEditUser = {
                name,
                email,
            }

            if(password) {
                const passwordEncrypted = await bcrypt.hash(password, saltRounds)
                objToUpdate.password = passwordEncrypted
            }

            await UsersSchema.updateOne({_id},objToUpdate)

            return res.json({
                success: 1,
                user: _id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { _id } = req.body
        if (!_id) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })
        
        try {
            await UsersSchema.deleteOne({_id})

            return res.json({
                success: 1,
                user: _id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }
}

export default new UsersController()