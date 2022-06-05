import EntityNotFound from '@/errors/EntityNotFound'
import NotAllowed from '@/errors/NotAllowed'
import createRepositories, { Repositories } from '@/repositories'
import RegisterItem from '@/useCases/restaurant/RegisterItem'
import { createItem, createRestaurant } from './utils'

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

  it('should not be able to register an item in a non-existent restaurant', async () => {
    const registerItem = new RegisterItem(repository.restaurant)
    const restaurantID = 'restaurant-id-not-existent'

    await expect(
      registerItem.execute(restaurantID, {
        name: 'Pão de Queijo',
        description: 'Pão de Queijo mineiro legítimo',
        price: '3,90',
        type: 'FOOD'
      })
    ).rejects.toEqual(new EntityNotFound('Restaurant'))
  })

  it('should not be able to register an item with the same name', async () => {
    const restaurant = await createRestaurant(repository)
    await createItem(restaurant.restaurantID, repository)

    await expect(
      createItem(restaurant.restaurantID, repository)
    ).rejects.toEqual(new NotAllowed('Already exists an item with the same name'))
  })
})
