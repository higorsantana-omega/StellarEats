import toolbox from '@/toolbox/toolbox'
import Restaurant from './Restaurant'

type RestaurantDTO = Omit<Restaurant, 'restaurantID'>

export default class ResgisterRestaurant {
  constructor () {}

  async execute (data: RestaurantDTO): Promise<Restaurant> {
    const restaurant: Restaurant = {
      restaurantID: toolbox.generateUUID(),
      ...data
    }
    return restaurant
  }
}
