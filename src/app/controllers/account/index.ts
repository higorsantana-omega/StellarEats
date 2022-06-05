import Route from '../Route'
import SignupController from './SignupController'

const accountRoutes: Route[] = [
  {
    url: '/signup',
    method: 'POST',
    Controller: SignupController
  }
]

export default accountRoutes
