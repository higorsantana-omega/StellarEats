import application from '@test/application.spec'
import request from 'supertest'

describe('Filter Restaurant Controller', () => {
  test('should return restaurants on success', async () => {
    await request(application.app)
      .post('/restaurants')
      .expect(200)
  })
})
