import express from "express"
const routes = express.Router()
import { Request, Response } from 'express'
import AdmsRoute from "./Adms/routes"
import AuthRoute from "./Auth/routes"
import CarsRoute from "./Cars/routes"
import MessagesRoute from "./Messages/routes"
import RentsRoute from "./Rents/routes"
import UsersRoute from "./Users/routes"

routes.get('/', (request: Request, response: Response) => {
    return response.json({'error':1})
})

routes.get("/api/documentation", function (req, res) {
    res.sendFile(`${__dirname}/public/api-doc/index.html`)
})

new CarsRoute(routes)
new UsersRoute(routes)
new RentsRoute(routes)
new MessagesRoute(routes)
new AdmsRoute(routes)
new AuthRoute(routes)

export {
    routes
}