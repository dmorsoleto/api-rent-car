import CarsController from './controller'
import { verifyJWT } from "../helpers/jwt"

class CarsRoute {
  constructor(route: any) {
    route.get('/get/cars', verifyJWT, CarsController.getAll)
    route.post('/add/car', verifyJWT, CarsController.addCar)
    route.put('/edit/car', verifyJWT, CarsController.editCar)
    route.delete('/delete/car', verifyJWT, CarsController.deleteCar)
  }
}
export default CarsRoute