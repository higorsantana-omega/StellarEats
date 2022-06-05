import ResgisterRestaurant from '@/useCases/restaurant/RegisterRestaurant'
import { Address, Item } from '@/useCases/restaurant/Restaurant'

describe('Register Restaurant', () => {
  it('should register an restaurant', async () => {
    const resgisterRestaurant = new ResgisterRestaurant()

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

    expect(restaurant).toHaveProperty('restaurantID')
    expect(restaurant.restaurantID).not.toBe('')
    expect(restaurant.menu[0]).toEqual(item)
    expect(restaurant.address).toEqual(address)
    expect(restaurant.phone).toBe(phone)
  })
})
