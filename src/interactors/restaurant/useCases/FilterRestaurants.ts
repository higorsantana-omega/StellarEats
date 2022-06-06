import Repository from '@/repositories/Repository'
import Restaurant, { FilterRestaurantsQuery, Gastronomy } from '../Restaurant'

export default class FilterRestaurants {
  constructor (private repository: Repository<Restaurant>) {}

  async execute (filterQuery: FilterRestaurantsQuery): Promise<Restaurant[]> {
    let filterObj: {
      'address.city'?: string
      gastronomy?: Gastronomy
    } = {}

    if (filterQuery?.food) filterObj = Object.assign(filterObj, { $text: { $search: filterQuery.food } })
    if (filterQuery?.city) filterObj['address.city'] = filterQuery.city
    if (filterQuery?.gastronomy) filterObj.gastronomy = filterQuery.gastronomy

    const restaurants = await this.repository.select(filterObj)
    return restaurants
  }
}
