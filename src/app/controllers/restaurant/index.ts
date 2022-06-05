import Route from '../Route'
import RegisterItemController from './RegisterItemController'
import RegisterRestaurantController from './RegisterRestaurantController'
import UpdateItemController from './UpdateItemController'

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
  },
  {
    url: '/restaurant/:restaurantID/:itemID',
    method: 'PUT',
    Controller: UpdateItemController
  }
]

export default restaurantRoutes
