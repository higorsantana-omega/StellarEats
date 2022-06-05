import NotAllowed from '@/errors/NotAllowed'
import Repository from '@/repositories/Repository'
import ToolBox from '@/toolbox/IToolbox'
import Restaurant from '../Restaurant'

export type RestaurantDTO = Omit<Restaurant, 'restaurantID' | 'menu'>

export default class ResgisterRestaurant {
  constructor (
    private repository: Repository<Restaurant>,
    private toolbox: ToolBox
  ) {}

  async execute (data: RestaurantDTO): Promise<Restaurant> {
    const [restaurantExist] = await this.repository.select({
      $or: [{ name: data.name }, { phone: data.phone }]
    })
    if (restaurantExist) throw new NotAllowed('Restaurant already exist')

    const restaurant: Restaurant = {
      ...data,
      menu: [],
      restaurantID: this.toolbox.generateUUID()
    }

    await this.repository.save(restaurant)
    return restaurant
  }
}
