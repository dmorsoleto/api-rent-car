import RentsController from './controllers'
import { verifyJWT } from "../helpers/jwt"

class RentsRoute {
  constructor(route: any) {
    route.get('/get/rents', verifyJWT, RentsController.getAll)
    route.post('/add/rent', verifyJWT, RentsController.addRent)
    route.put('/cancel/rent', verifyJWT, RentsController.cancelRent)
    route.get('/calcular-dias-restantes', verifyJWT, RentsController.calculateRemainingDays)
  }
}
export default RentsRoute