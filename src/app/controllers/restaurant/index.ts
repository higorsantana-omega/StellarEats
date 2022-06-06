import Route from '../Route'
import FilterRestaurantsController from './FilterRestaurantsController'
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
  },
  {
    url: '/restaurants',
    method: 'POST',
    Controller: FilterRestaurantsController
  }
]

export default restaurantRoutes
