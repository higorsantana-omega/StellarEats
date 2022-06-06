import { createRestaurant } from './utils'
import application from '@test/application.spec'

describe('Filter Restaurants', () => {
  it('should filter restaurants by city', async () => {
    await createRestaurant()
    await createRestaurant({ name: 'Uai Food 2', phone: '111112222' })
    await createRestaurant({
      name: 'Paulistano',
      phone: '122223333',
      address: {
        city: 'Juiz de fora',
        district: 'Jardim Paulista',
        number: '102',
        postcode: '03546010',
        street: 'Rua 123',
        complement: '',
        state: 'MG'
      }
    })

    const restaurants1 = await application
      .interactors
      .restaurant
      .filterRestaurants({ city: 'Belo Horizonte' })

    expect(restaurants1).toHaveLength(2)

    const restaurants2 = await application
      .interactors
      .restaurant
      .filterRestaurants({ city: 'Juiz de fora' })

    expect(restaurants2).toHaveLength(1)

    const restaurants3 = await application
      .interactors
      .restaurant
      .filterRestaurants({ city: 'Betim' })

    expect(restaurants3).toHaveLength(0)
  })

  it('should filter restaurants by gastronomy', async () => {
    await createRestaurant()
    await createRestaurant({
      name: 'Uai Food 2',
      phone: '111112222',
      gastronomy: 'Chinesa'
    })
    await createRestaurant({
      name: 'Paulistano',
      phone: '122223333',
      gastronomy: 'Chinesa'
    })

    const restaurants1 = await application
      .interactors
      .restaurant
      .filterRestaurants({ gastronomy: 'Brasileira' })

    expect(restaurants1).toHaveLength(1)

    const restaurants2 = await application
      .interactors
      .restaurant
      .filterRestaurants({ gastronomy: 'Chinesa' })

    expect(restaurants2).toHaveLength(2)
  })
})
