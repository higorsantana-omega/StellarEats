import Restaurant, { Address, Item } from '@/interactors/restaurant/Restaurant'
import application from '@test/application.spec'

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

  const restaurant = await application
    .interactors
    .restaurant
    .registerRestaurant({
      name: 'Uai Food',
      gastronomy: 'Brasileira',
      address,
      phone
    })
  return restaurant
}

export async function createItem (restaurantID: string): Promise<Item> {
  const item = await application
    .interactors
    .restaurant
    .registerItem(restaurantID, {
      name: 'Pão de Queijo',
      description: 'Pão de Queijo mineiro legítimo',
      price: '3,90',
      type: 'FOOD'
    })

  return item
}
