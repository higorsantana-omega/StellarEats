import EntityNotFound from '@/errors/EntityNotFound'
import NotAllowed from '@/errors/NotAllowed'
import createRepositories, { Repositories } from '@/repositories'
import UpdateItem from '@/useCases/restaurant/UpdateItem'
import { createItem, createRestaurant } from './utils'

let repository: Repositories

describe('Update Item', () => {
  beforeAll(async () => {
    repository = await createRepositories()
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(repository)
        .map(repository => repository.remove({}))
    )
  })

  it('should update an item in a certain restaurant', async () => {
    const updateItem = new UpdateItem(repository.restaurant)
    const restaurant = await createRestaurant(repository)
    const item = await createItem(restaurant.restaurantID, repository)

    await updateItem.execute(restaurant.restaurantID, item.itemID, {
      name: 'Pão de Queijo 2',
      description: 'Pão de Queijo mineiro legítimo',
      price: '5,50',
      type: 'FOOD'
    })

    const [updatedRestaurant] = await repository
      .restaurant
      .select({ restaurantID: restaurant.restaurantID })

    expect(updatedRestaurant.menu[0].name).not.toBe(item.name)
    expect(updatedRestaurant.menu[0].price).not.toBe(item.price)
  })

  it('should not be able to update an item if restaurant does not exist', async () => {
    const updateItem = new UpdateItem(repository.restaurant)
    const restaurantID = 'restaurant-id-not-existent'

    await expect(
      updateItem.execute(restaurantID, 'itemID', {
        name: 'Pão de Queijo 2',
        description: 'Pão de Queijo mineiro legítimo',
        price: '5,50',
        type: 'FOOD'
      })
    ).rejects.toEqual(new EntityNotFound('Restaurant'))
  })

  it('should not be able to update an item if item does not exist', async () => {
    const updateItem = new UpdateItem(repository.restaurant)
    const restaurant = await createRestaurant(repository)

    const itemID = 'item-id-not-exist'

    await expect(
      updateItem.execute(restaurant.restaurantID, itemID, {
        name: 'Pão de Queijo 2',
        description: 'Pão de Queijo mineiro legítimo',
        price: '5,50',
        type: 'FOOD'
      })
    ).rejects.toEqual(new NotAllowed('Item not exists'))
  })
})
