import NotAllowed from '@/errors/NotAllowed'
import { Address } from '@/interactors/restaurant/Restaurant'
import { createRestaurant } from './utils'
import application from '@test/application.spec'
import { createAccount } from '../account/utils'

describe('Register Restaurant', () => {
  it('should register an restaurant', async () => {
    const address: Address = {
      city: 'Belo Horizonte',
      street: 'Rua Doutor Lund',
      postcode: '31150-410',
      complement: '',
      state: 'MG',
      number: '1002',
      district: 'Santa Cruz'
    }

    const phone = '31988621608'

    const account = await createAccount()

    const restaurant = await application
      .interactors
      .restaurant
      .registerRestaurant({
        name: 'Uai Food',
        gastronomy: 'Brasileira',
        address,
        phone
      }, account.userID)

    expect(restaurant).toHaveProperty('restaurantID')
    expect(restaurant.restaurantID).not.toBe('')
    expect(restaurant.address).toEqual(address)
    expect(restaurant.phone).toBe(phone)
  })

  it('should not be able register an restaurant already exist', async () => {
    await createRestaurant()

    await expect(
      createRestaurant()
    ).rejects.toEqual(new NotAllowed('Restaurant already exist'))
  })
})
