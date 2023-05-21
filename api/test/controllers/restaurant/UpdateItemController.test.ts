import Authentication from '@/app/middleware/Authentication'
import application from '@test/application.spec'
import { createItem, createRestaurant } from '@test/useCases/restaurant/utils'
import request from 'supertest'

describe('Update Item Controller', () => {
  test('should return an item updated on success', async () => {
    const restaurant = await createRestaurant()
    const token = (new Authentication()).createAccessToken(restaurant.ownerID)

    const item = await createItem(restaurant.restaurantID)

    await request(application.app)
      .put(`/restaurant/${restaurant.restaurantID}/${item.itemID}`)
      .set('Authorization', token)
      .send({ name: 'Item 3' })
      .expect(200)
  })
})
