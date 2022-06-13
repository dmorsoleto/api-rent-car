import express from "express"
import cors from "cors"
import helmet from 'helmet'
import mongoose from "mongoose"
import mongoDb from "./config/database"
import {routes} from './routes'
import ejs from 'ejs'
import CarsRepository from "./Cars/repository"
import AdmsRepository from "./Adms/repository"
import { Express, Request, Response, NextFunction } from 'express'

const uriMongo = mongoDb.url

class Server {
      private initializeWithoutDB = false
      expressEntity: Express
      constructor(initWhDB?: boolean) {
            if(initWhDB) {
                  this.initializeWithoutDB = initWhDB
            }
            this.expressEntity = express()
            this.middlewares()
            this.routes()
            if(!this.initializeWithoutDB) {
                  this.database()
            }
      }

      public runServer(port: string) {
            this.expressEntity.listen(port, () => console.log(`Listening on port ${port}!`)) 
      }

      public getExpress() {
            return this.expressEntity
      }

      private database() {
            console.log('uriMongo', uriMongo)
            mongoose.connect(uriMongo).then(() => {
                  console.log("connected!")
                  CarsRepository.createCarsDummyData()
                  AdmsRepository.createAdmsDummyData()
            })
            .catch((err: unknown) => {
                  console.log("can't connect!", err)
            })
      }

      private middlewares() {
            this.expressEntity.use(helmet())
            this.expressEntity.use(express.json({limit: "9091990mb"}))
            this.expressEntity.use(express.urlencoded({extended:true}))
            
            this.expressEntity.use(cors())
            this.expressEntity.use(function(req: Request, res: Response, next: NextFunction) {
               res.header("Access-Control-Allow-Origin", "*")
               res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
               next()
            })
            this.expressEntity.engine('html', ejs.renderFile)
            this.expressEntity.set('view engine', 'html')
            this.expressEntity.set('view engine', 'ejs')
            this.expressEntity.use(express.static(`${__dirname}/public`))
      }

      private routes() {
            this.expressEntity.use(routes)
      }
}

export default Server