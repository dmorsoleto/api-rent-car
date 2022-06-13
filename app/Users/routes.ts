import UsersController from './controller'
import { verifyJWT } from "../helpers/jwt"

class UsersRoute {
  constructor(route: any) {
    route.get('/get/users', verifyJWT, UsersController.getAll)
    route.post('/add/user', verifyJWT, UsersController.addUser)
    route.put('/edit/user', verifyJWT, UsersController.editUser)
    route.delete('/delete/user', verifyJWT, UsersController.deleteUser)
  }
}
export default UsersRoute