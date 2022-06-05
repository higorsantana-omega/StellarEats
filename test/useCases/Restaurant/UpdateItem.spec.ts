import EntityNotFound from '@/errors/EntityNotFound'
import NotAllowed from '@/errors/NotAllowed'
import { createItem, createRestaurant } from './utils'
import application from '@test/application.spec'

describe('Update Item', () => {
  it('should update an item in a certain restaurant', async () => {
    const restaurant = await createRestaurant()
    const item = await createItem(restaurant.restaurantID)

    await application
      .interactors
      .restaurant
      .updateItem(restaurant.restaurantID, item.itemID, {
        name: 'Pão de Queijo 2',
        description: 'Pão de Queijo mineiro legítimo',
        price: '5,50',
        type: 'FOOD'
      })

    const [updatedRestaurant] = await application
      .interactors
      .restaurant
      .find({ restaurantID: restaurant.restaurantID })

    expect(updatedRestaurant.menu[0].name).not.toBe(item.name)
    expect(updatedRestaurant.menu[0].price).not.toBe(item.price)
  })

  it('should not be able to update an item if restaurant does not exist', async () => {
    const restaurantID = 'restaurant-id-not-existent'

    await expect(
      application
        .interactors
        .restaurant
        .updateItem(restaurantID, 'itemID', {
          name: 'Pão de Queijo 2',
          description: 'Pão de Queijo mineiro legítimo',
          price: '5,50',
          type: 'FOOD'
        })
    ).rejects.toEqual(new EntityNotFound('Restaurant'))
  })

  it('should not be able to update an item if item does not exist', async () => {
    const restaurant = await createRestaurant()

    const itemID = 'item-id-not-exist'

    await expect(
      application
        .interactors
        .restaurant
        .updateItem(restaurant.restaurantID, itemID, {
          name: 'Pão de Queijo 2',
          description: 'Pão de Queijo mineiro legítimo',
          price: '5,50',
          type: 'FOOD'
        })
    ).rejects.toEqual(new NotAllowed('Item not exists'))
  })
})
