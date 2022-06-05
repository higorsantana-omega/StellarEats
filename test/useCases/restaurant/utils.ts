import Restaurant, { Address, Item } from '@/interactors/restaurant/Restaurant'
import { ItemDTO } from '@/interactors/restaurant/useCases/RegisterItem'
import application from '@test/application.spec'
import { createAccount } from '../account/utils'

export async function createRestaurant (): Promise<Restaurant> {
  const address: Address = {
    city: 'Belo Horizonte',
    street: 'Rua Doutor Lund',
    postcode: '31150-410',
    complement: '',
    state: 'MG',
    number: '1002',
    district: 'Santa Cruz'
  }

  const phone = '31988621608'

  const account = await createAccount()

  const restaurant = await application
    .interactors
    .restaurant
    .registerRestaurant({
      name: 'Uai Food',
      gastronomy: 'Brasileira',
      address,
      phone
    }, account.userID)
  return restaurant
}

export async function createItem (restaurantID: string, props?: Partial<ItemDTO>): Promise<Item> {
  let data: ItemDTO = {
    name: 'Pão de Queijo',
    description: 'Pão de Queijo mineiro legítimo',
    price: '3,90',
    type: 'FOOD'
  }

  if (props) data = Object.assign(data, { ...props })

  const item = await application
    .interactors
    .restaurant
    .registerItem(restaurantID, data)

  return item
}
