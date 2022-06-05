import NotAllowed from '@/errors/NotAllowed'
import Repository from '@/repositories/Repository'
import toolbox from '@/toolbox/toolbox'
import Restaurant from './Restaurant'

type RestaurantDTO = Omit<Restaurant, 'restaurantID' | 'menu'>

export default class ResgisterRestaurant {
  constructor (private repository: Repository<Restaurant>) {}

  async execute (data: RestaurantDTO): Promise<Restaurant> {
    const [restaurantExist] = await this.repository.select({
      $or: [{ name: data.name }, { phone: data.phone }]
    })
    if (restaurantExist) throw new NotAllowed('Restaurant already exist')

    const restaurant: Restaurant = {
      ...data,
      menu: [],
      restaurantID: toolbox.generateUUID()
    }

    await this.repository.save(restaurant)
    return restaurant
  }
}
