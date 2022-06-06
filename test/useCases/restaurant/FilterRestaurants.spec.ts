import { createItem, createRestaurant } from './utils'
import application from '@test/application.spec'
import { Address } from '@/interactors/restaurant/Restaurant'

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

  it('should filter restaurants by food', async () => {
    const restaurant1 = await createRestaurant()
    const restaurant2 = await createRestaurant({
      name: 'Uai Food 2',
      phone: '111112222'
    })
    const restaurant3 = await createRestaurant({
      name: 'Paulistano',
      phone: '122223333'
    })

    await createItem(restaurant1.restaurantID)
    await createItem(restaurant2.restaurantID)
    await createItem(restaurant3.restaurantID, { name: 'Pizza' })

    const restaurants1 = await application
      .interactors
      .restaurant
      .filterRestaurants({ food: 'Pizza' })

    expect(restaurants1).toHaveLength(1)

    const restaurants2 = await application
      .interactors
      .restaurant
      .filterRestaurants({ food: 'Pão de Queijo' })

    expect(restaurants2).toHaveLength(2)

    const restaurants3 = await application
      .interactors
      .restaurant
      .filterRestaurants({ food: 'Pão de Quei' })

    expect(restaurants3).toHaveLength(2)
  })

  it('should filter restaurants by all filters', async () => {
    const restaurant1 = await createRestaurant()
    const restaurant2 = await createRestaurant({
      name: 'Uai Food 2',
      phone: '111112222',
      gastronomy: 'Chinesa',
      address: {
        city: 'Betim'
      } as Address
    })
    const restaurant3 = await createRestaurant({
      name: 'Paulistano',
      phone: '122223333',
      gastronomy: 'Chinesa'
    })

    await createItem(restaurant1.restaurantID)
    await createItem(restaurant2.restaurantID, { name: 'Pizza' })
    await createItem(restaurant3.restaurantID, { name: 'Pizza' })

    const restaurants1 = await application
      .interactors
      .restaurant
      .filterRestaurants({ food: 'Pizza', gastronomy: 'Chinesa' })

    expect(restaurants1).toHaveLength(2)

    const restaurants2 = await application
      .interactors
      .restaurant
      .filterRestaurants({ food: 'Pizza', gastronomy: 'Chinesa', city: 'Betim' })

    expect(restaurants2).toHaveLength(1)
  })
})
