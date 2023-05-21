import application from '@test/application.spec'
import { createAccount } from '@test/useCases/account/utils'
import request from 'supertest'

describe('Signup Controller', () => {
  test('should return an account on success', async () => {
    const account = await createAccount()

    await request(application.app)
      .post('/login')
      .send({
        email: account.email,
        password: '12345678'
      })
      .expect(200)
  })
})
