import EntityNotFound from '@/errors/EntityNotFound'
import NotAllowed from '@/errors/NotAllowed'
import { createItem, createRestaurant } from './utils'
import application from '@test/application.spec'

describe('Register Item', () => {
  it('should register an item in a certain restaurant', async () => {
    const restaurant = await createRestaurant()

    const item = await application
      .interactors
      .restaurant
      .registerItem(restaurant.restaurantID, {
        name: 'Pão de Queijo',
        description: 'Pão de Queijo mineiro legítimo',
        price: '3,90',
        type: 'FOOD'
      })

    const [updatedRestaurant] = await application
      .interactors
      .restaurant
      .find({ restaurantID: restaurant.restaurantID })

    expect(updatedRestaurant.menu).toHaveLength(1)
    expect(updatedRestaurant.menu[0].name).toBe(item.name)
  })

  it('should not be able to register an item in a non-existent restaurant', async () => {
    const restaurantID = 'restaurant-id-not-existent'

    await expect(
      application
        .interactors
        .restaurant
        .registerItem(restaurantID, {
          name: 'Pão de Queijo',
          description: 'Pão de Queijo mineiro legítimo',
          price: '3,90',
          type: 'FOOD'
        })
    ).rejects.toEqual(new EntityNotFound('Restaurant'))
  })

  it('should not be able to register an item with the same name', async () => {
    const restaurant = await createRestaurant()
    await createItem(restaurant.restaurantID)

    await expect(
      createItem(restaurant.restaurantID)
    ).rejects.toEqual(new NotAllowed('Already exists an item with the same name'))
  })
})
