import MessagesSchema from "./model"
import { Request, Response } from 'express'

class MessagesController {

    async getAll(req: Request, res: Response) {
        try {
            const all = await MessagesSchema.find({})

            return res.json({
                success: 1,
                messages: all
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }
}

export default new MessagesController()