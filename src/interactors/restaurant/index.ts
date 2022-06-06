import BaseInteractor from '../BaseInteractor'
import Restaurant, { FilterRestaurantsQuery, Item } from './Restaurant'
import FilterRestaurants from './useCases/FilterRestaurants'
import RegisterItem, { ItemDTO } from './useCases/RegisterItem'
import ResgisterRestaurant, { RestaurantDTO } from './useCases/RegisterRestaurant'
import UpdateItem from './useCases/UpdateItem'

export default class RestaurantInteractor extends BaseInteractor<Restaurant> {
  registerRestaurant (data: RestaurantDTO, ownerID: string): Promise<Restaurant> {
    const registerRestaurant = new ResgisterRestaurant(
      this.repository,
      this.toolbox
    )
    return registerRestaurant.execute(data, ownerID)
  }

  registerItem (restaurantID: string, item: ItemDTO): Promise<Item> {
    const registerItem = new RegisterItem(this.repository)
    return registerItem.execute(restaurantID, item)
  }

  updateItem (restaurantID: string, itemID:string, item: ItemDTO): Promise<Item> {
    const updateItem = new UpdateItem(this.repository)
    return updateItem.execute(restaurantID, itemID, item)
  }

  filterRestaurants (filterQuery: FilterRestaurantsQuery): Promise<Restaurant[]> {
    const filterRestaurants = new FilterRestaurants(this.repository)
    return filterRestaurants.execute(filterQuery)
  }
}
