import Repository from '@/repositories/Repository'
import Restaurant from '../Restaurant'

export default class FilterRestaurants {
  constructor (private repository: Repository<Restaurant>) {}

  async execute (city: string): Promise<Restaurant[]> {
    const restaurants = await this.repository.select({
      'address.city': city
    })
    return restaurants
  }
}
