import accountRoutes from './account'
import restaurantRoutes from './restaurant'
import Route from './Route'

const routes: Route[] = [
  ...accountRoutes,
  ...restaurantRoutes
]

export default routes
