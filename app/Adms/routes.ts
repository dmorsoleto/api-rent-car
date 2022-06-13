import AdmsController from './controller'
import { verifyJWT } from "../helpers/jwt"

class AdmsRoute {
  constructor(route: any) {
    route.get('/get/admins', verifyJWT, AdmsController.getAll)
    route.post('/add/admin', verifyJWT, AdmsController.addAdmin)
    route.put('/edit/admin', verifyJWT, AdmsController.editAdmin)
    route.delete('/delete/admin', verifyJWT, AdmsController.deleteAdmin)
  }
}
export default AdmsRoute