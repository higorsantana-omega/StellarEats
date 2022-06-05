import Route from '../Route'
import RegisterRestaurantController from './RegisterRestaurantController'

const restaurantRoutes: Route[] = [
  {
    url: '/restaurant',
    method: 'POST',
    Controller: RegisterRestaurantController
  }
]

export default restaurantRoutes
