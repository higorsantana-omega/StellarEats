import Route from '../Route'
import RegisterItemController from './RegisterItemController'
import RegisterRestaurantController from './RegisterRestaurantController'

const restaurantRoutes: Route[] = [
  {
    url: '/restaurant',
    method: 'POST',
    Controller: RegisterRestaurantController
  },
  {
    url: '/restaurant/:restaurantID',
    method: 'POST',
    Controller: RegisterItemController
  }
]

export default restaurantRoutes
