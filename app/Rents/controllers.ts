import RentsSchema from "./model"
import { Request, Response } from 'express'
import CarsRepository from "../Cars/repository"
import UsersRepository from "../Users/repository"
import { calculateDaysBetweenDates, checkDatesStartEnds } from "../utils"
import RabbitMQ, { ObjToSendRabbitMQ } from "../config/rabbitmq"
import { v4 as uuidv4 } from 'uuid'

class RentsController {

    async getAll(req: Request, res: Response) {
        try {
            const allRents = await RentsSchema.aggregate([
                {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'users_idusers', 
                    'foreignField': '_id', 
                    'as': 'user'
                  }
                }, {
                  '$lookup': {
                    'from': 'cars', 
                    'localField': 'cars_idcars', 
                    'foreignField': '_id', 
                    'as': 'car'
                  }
                }, {
                  '$project': {
                    '_id': 1, 
                    'rentStart': 1, 
                    'rentEnd': 1, 
                    'total': 1, 
                    'user.name': 1, 
                    'user.email': 1, 
                    'car._id': 1, 
                    'car.name': 1, 
                    'car.brand': 1, 
                    'car.year': 1, 
                    'car.model': 1, 
                    'car.price': 1
                  }
                }
              ])

            return res.json({
                success: 1,
                rents: allRents
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async addRent(req: Request, res: Response) {
        const { rentStart, rentEnd, idUser, idCar } = req.body
        if (!rentStart || !rentEnd || !idUser || !idCar ) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {
            const validationDates = checkDatesStartEnds(rentStart, rentEnd)            
            if(!validationDates) return res.json({ error: 1, message: `A data do fim não pode ser maior que a data do início.`})

            const now = new Date()
            const hasActiveLocation = await RentsSchema.findOne({
                users_idusers: idUser,
                status: 'approved',
                rentEnd: {
                    '$gte': now.getTime()
                }
            }).lean()
            
            if(hasActiveLocation) return res.json({ error: 1, message: `O cliente já tem uma locação ativa.`})

            const carEntity = await CarsRepository.findOne(idCar)
            if(!carEntity) return res.json({ error: 1, message: `Nenhum carro encontrado!`})
            const hasUser = await UsersRepository.findOne(idUser)
            if(!hasUser) return res.json({ error: 1, message: `Nenhum usuário encontrado!`})
            const totalDays = calculateDaysBetweenDates(rentStart,rentEnd)
            if(!totalDays) return res.json({ error: 1, message: `Datas inseridas não são válidas ou não estão em milesegundos!`})
            
            const totalPrice = (carEntity.price * totalDays) / 100

            const rentSaved = await RentsSchema.create({
                rentStart,
                rentEnd,
                status: 'approved',
                total: totalPrice, 
                users_idusers: idUser,
                cars_idcars: idCar
            })

            return res.json({
                success: 1,
                cars: rentSaved._id
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }

    async cancelRent(req: Request, res: Response) {
        const { _id } = req.body
        if (!_id) return res.status(200).json({ error: 1, message: 'Required parameters not found!' })

        try {
            await RentsSchema.updateOne({_id: _id}, {status: 'cancelled'})

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

    async calculateRemainingDays(req: Request, res: Response) {
        try {
            const unixNow = new Date().getTime()

            const hasRentActive = await RentsSchema.aggregate([
                {
                    '$lookup': {
                      'from': 'users', 
                      'localField': 'users_idusers', 
                      'foreignField': '_id', 
                      'as': 'user'
                    }
                  }, {
                    '$lookup': {
                      'from': 'cars', 
                      'localField': 'cars_idcars', 
                      'foreignField': '_id', 
                      'as': 'car'
                    }
                  },
                  {
                    '$match': {
                        'status': 'approved', 
                        'rentEnd': {
                            '$gte': unixNow
                        }
                    }
                  }
            ])            

            if(!hasRentActive.length) return res.status(200).json({ error: 1, message: 'Sistema sem nenhuma locação ativa.' })
            
            const objReturn = []
            for (let index = 0; index < hasRentActive.length; index++) {
                const rent = hasRentActive[index]
                
                const totalDays = calculateDaysBetweenDates(unixNow, rent.rentEnd)
                const objRent = {
                    id: uuidv4(),
                    email: rent['user'][0]['email'], 
                    name: rent['user'][0]['name'],
                    daysLeft: totalDays
                }

                const objToSendRabbitMQ: ObjToSendRabbitMQ = {
                    exchange: 'user.rent',
                    queue: 'user.rent_active',
                    routingKey: 'rent_active',
                    message: objRent
                }
                
                const rabbitMq = new RabbitMQ()
                rabbitMq.sendMessage(objToSendRabbitMQ)

                objReturn.push(objRent)
            }
            
            return res.json({
                success: 1,
                rents: objReturn
            })
        } catch (err: unknown) {
            return res.json({
                error: 1,
                data: err
            })
        }
    }
}

export default new RentsController()