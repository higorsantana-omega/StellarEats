import application from '@test/application.spec'
import request from 'supertest'

describe('Signup Controller', () => {
  test('should return an account on success', async () => {
    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'
    const password = '12345678'

    await request(application.app)
      .post('/signup')
      .send({
        name,
        email,
        phone,
        password
      })
      .expect(200)
  })
})
