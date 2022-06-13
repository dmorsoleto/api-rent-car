import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const secret = process.env.SECRET || "@123#456"

function verifyJWT(req: Request, res: Response, next:NextFunction) {
    const headers = req.headers

    if(!headers.authorization) return res.status(400).json({ auth: false, message: 'Headers Empty' })

    const token = headers.authorization.replace('Bearer ','')
    if (!token) return res.status(401).json({ auth: false, message: 'Not allowed.' })
 
    jwt.verify(token, secret, function (err: unknown) {
       if (err) return res.status(400).json({ auth: false, message: 'Failed to authenticate token.' })
       next()
    })
}

export {
    verifyJWT
}