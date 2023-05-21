import Route from '../Route'
import LoginController from './LoginController'
import SignupController from './SignupController'

const accountRoutes: Route[] = [
  {
    url: '/signup',
    method: 'POST',
    Controller: SignupController
  },
  {
    url: '/login',
    method: 'POST',
    Controller: LoginController
  }
]

export default accountRoutes
