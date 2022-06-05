import Authentication from '@/app/middleware/Authentication'
import application from '@test/application.spec'
import { createAccount } from '@test/useCases/account/utils'
import request from 'supertest'

describe('Register Restaurant Controller', () => {
  test('should return an restaurant on success', async () => {
    const account = await createAccount()
    const token = (new Authentication()).createAccessToken(account.userID)

    await request(application.app)
      .post('/restaurant')
      .set('Authorization', token)
      .send({
        name: 'Uai food 3',
        gastronomy: 'Brasileira',
        phone: '11963367221',
        address: {
          postcode: '0353010',
          street: 'Rua tal',
          number: '120',
          complement: '',
          district: 'Bairro tal',
          city: 'Minas gerais',
          state: 'MG'
        }
      })
      .expect(201)
  })
})
