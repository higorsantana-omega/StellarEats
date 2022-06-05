import NotAllowed from '@/errors/NotAllowed'
import createRepositories, { Repositories } from '@/repositories'
import ResgisterRestaurant from '@/useCases/restaurant/RegisterRestaurant'
import { Address, Item } from '@/useCases/restaurant/Restaurant'
import { createRestaurant } from './utils'

let repository: Repositories

describe('Register Restaurant', () => {
  beforeAll(async () => {
    repository = await createRepositories()
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(repository)
        .map(repository => repository.remove({}))
    )
  })

  it('should register an restaurant', async () => {
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

    expect(restaurant).toHaveProperty('restaurantID')
    expect(restaurant.restaurantID).not.toBe('')
    expect(restaurant.menu[0]).toEqual(item)
    expect(restaurant.address).toEqual(address)
    expect(restaurant.phone).toBe(phone)
  })

  it('should not be able register an restaurant already exist', async () => {
    await createRestaurant(repository)

    await expect(
      createRestaurant(repository)
    ).rejects.toEqual(new NotAllowed('Restaurant already exist'))
  })
})
