import EntityNotFound from '@/errors/EntityNotFound'
import Repository from '@/repositories/Repository'
import Restaurant, { Item } from './Restaurant'

type ItemDTO = Omit<Item, 'itemID'>

export default class UpdateItem {
  constructor (private repository: Repository<Restaurant>) {}

  async execute (restaurantID: string, itemID:string, item: ItemDTO): Promise<Item> {
    const [restaurant] = await this.repository.select({
      restaurantID
    })
    if (!restaurant) throw new EntityNotFound('Restaurant')

    const itemFound = restaurant.menu.find(i => i.itemID === itemID)
    const itemIndex = restaurant.menu.findIndex(i => i.itemID === itemID)

    const newItem: Item = Object.assign(itemFound, { ...item })
    restaurant.menu[itemIndex] = newItem

    await this.repository.save(restaurant)
    return newItem
  }
}
