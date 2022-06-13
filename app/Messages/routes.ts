import MessagesController from './controllers'
import { verifyJWT } from "../helpers/jwt"

class MessagesRoute {
  constructor(route: any) {
    route.get('/get/messages', verifyJWT, MessagesController.getAll)
  }
}
export default MessagesRoute