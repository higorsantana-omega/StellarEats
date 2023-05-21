import EntityNotFound from '@/errors/EntityNotFound'
import NotAllowed from '@/errors/NotAllowed'
import Repository from '@/repositories/Repository'
import toolbox from '@/toolbox/toolbox'
import Restaurant, { Item } from '../Restaurant'

export type ItemDTO = Omit<Item, 'itemID'>

export default class RegisterItem {
  constructor (private repository: Repository<Restaurant>) {}

  async execute (restaurantID: string, item: ItemDTO): Promise<Item> {
    const [restaurant] = await this.repository.select({
      restaurantID
    })
    if (!restaurant) throw new EntityNotFound('Restaurant')

    const itemExists = restaurant.menu.find(i => i.name === item.name)
    if (itemExists) throw new NotAllowed('Already exists an item with the same name')

    const newItem: Item = { ...item, itemID: toolbox.generateUUID() }
    restaurant.menu.push(newItem)

    await this.repository.save(restaurant)
    return newItem
  }
}
