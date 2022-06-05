import { Repositories } from '@/repositories'
import ResgisterRestaurant from '@/useCases/restaurant/RegisterRestaurant'
import Restaurant, { Address, Item } from '@/useCases/restaurant/Restaurant'

export async function createRestaurant (repository: Repositories): Promise<Restaurant> {
  const resgisterRestaurant = new ResgisterRestaurant(repository.restaurant)

  const address: Address = {
    city: 'Belo Horizonte',
    street: 'Rua Doutor Lund',
    postcode: '31150-410',
    complement: '',
    state: 'MG',
    number: '1002',
    district: 'Santa Cruz'
  }

  const item: Item = {
    name: 'Feijão tropeiro',
    description: 'Receita típica de Minas Gerais',
    price: '35,90',
    type: 'FOOD'
  }

  const phone = '31988621608'

  const restaurant = await resgisterRestaurant.execute({
    name: 'Uai Food',
    gastronomy: 'Brasileira',
    menu: [item],
    address,
    phone
  })
  return restaurant
}
