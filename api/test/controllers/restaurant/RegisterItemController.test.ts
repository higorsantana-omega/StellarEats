import Authentication from '@/app/middleware/Authentication'
import application from '@test/application.spec'
import { createRestaurant } from '@test/useCases/restaurant/utils'
import request from 'supertest'

describe('Register Item Controller', () => {
  test('should return an item on success', async () => {
    const restaurant = await createRestaurant()
    const token = (new Authentication()).createAccessToken(restaurant.ownerID)

    await request(application.app)
      .post(`/restaurant/${restaurant.restaurantID}`)
      .set('Authorization', token)
      .send({
        name: 'Item 2',
        description: 'AAAAAAAAAAAaaa',
        price: '25,00',
        type: 'FOOD'
      })
      .expect(201)
  })
})
