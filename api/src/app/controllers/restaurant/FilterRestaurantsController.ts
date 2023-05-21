
import { BaseController, Request, Response } from '../BaseController'

export default class FilterRestaurantsController extends BaseController {
  protected expectedRequest: {} = {
    query: {
      city: 'string',
      food: 'string',
      gastronomy: 'string'
    }
  }

  protected async execute (request: Request, response: Response):
  Promise<Response> {
    const restaurants = await this.interactors
      .restaurant
      .filterRestaurants(request.query)

    return response.status(200).send({ restaurants })
  }
}
