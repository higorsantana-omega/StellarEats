import createRepositories, { Repositories } from '@/repositories'
import RegisterItem from '@/useCases/restaurant/RegisterItem'
import { createRestaurant } from './utils'

let repository: Repositories

describe('Register Item', () => {
  beforeAll(async () => {
    repository = await createRepositories()
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(repository)
        .map(repository => repository.remove({}))
    )
  })

  it('should register an item in a certain restaurant', async () => {
    const registerItem = new RegisterItem(repository.restaurant)
    const restaurant = await createRestaurant(repository)

    const item = await registerItem.execute(restaurant.restaurantID, {
      name: 'Pão de Queijo',
      description: 'Pão de Queijo mineiro legítimo',
      price: '3,90',
      type: 'FOOD'
    })

    const [updatedRestaurant] = await repository
      .restaurant
      .select({ restaurantID: restaurant.restaurantID })

    expect(updatedRestaurant.menu).toHaveLength(2)
    expect(updatedRestaurant.menu[1].name).toBe(item.name)
  })
})
