import Repository from '@/repositories/Repository'
import Restaurant, { Item } from './Restaurant'

export default class RegisterItem {
  constructor (private repository: Repository<Restaurant>) {}

  async execute (restaurantID: string, item: Item): Promise<Item> {
    const [restaurant] = await this.repository.select({
      restaurantID
    })

    restaurant.menu.push(item)

    await this.repository.save(restaurant)
    return item
  }
}
