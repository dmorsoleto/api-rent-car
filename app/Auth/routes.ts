import AuthController from './controller'

class AuthRoute {
  constructor(route: any) {
    route.post('/auth', AuthController.auth)
    route.post('/auth/test/ci', AuthController.authTestCI)
  }
}
export default AuthRoute