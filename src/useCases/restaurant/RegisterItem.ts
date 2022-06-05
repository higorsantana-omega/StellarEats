import EntityNotFound from '@/errors/EntityNotFound'
import NotAllowed from '@/errors/NotAllowed'
import Repository from '@/repositories/Repository'
import Restaurant, { Item } from './Restaurant'

export default class RegisterItem {
  constructor (private repository: Repository<Restaurant>) {}

  async execute (restaurantID: string, item: Item): Promise<Item> {
    const [restaurant] = await this.repository.select({
      restaurantID
    })
    if (!restaurant) throw new EntityNotFound('Restaurant')

    const itemExists = restaurant.menu.find(i => i.name === item.name)
    if (itemExists) throw new NotAllowed('Already exists an item with the same name')

    restaurant.menu.push(item)

    await this.repository.save(restaurant)
    return item
  }
}
