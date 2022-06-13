import { Request, Response } from 'express'
import AdmsRepository from '../Adms/repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET || "@123#456"

class AuthController {
    
    async auth(req: Request, res: Response) {
        const { username, password } = req.body
        if (!username || !password) return res.status(400).json({ error: 1, message: 'Required parameters not found!' })

        try {
            const hasAdm = await AdmsRepository.findOne({username})
            if(!hasAdm) return res.status(400).json({ error: 1, message: 'User not found!' })

            const finalPassSavedToCompare = hasAdm.password.replace(/^\$2y(.+)$/i, '$2a$1')
            const check = await bcrypt.compare(password, finalPassSavedToCompare)

            if (!check) return res.status(400).json({ error: 1, message: 'User or password not match!' })

            const id = hasAdm._id
            const token = jwt.sign({ id }, secret)

            return res.json({
                success: 1,
                token
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async authTestCI(req: Request, res: Response) {
        const { username, password } = req.body
        if (!username || !password) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {            
            if(username !== "testeci" && password !== "123456")  return res.status(400).json({ error: 1, message: 'User or password not match!' })
            
            const token = jwt.sign({ username }, secret)
            
            return res.json({
                success: 1,
                token
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }
}

export default new AuthController()