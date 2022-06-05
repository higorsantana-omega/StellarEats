
import { BaseController, Request, Response } from '../BaseController'

export default class RegisterRestaurantController extends BaseController {
  protected expectedRequest: {} = {
    body: {
      name: 'required|string',
      gastronomy: 'required|string',
      phone: 'required|string',
      address: {
        postcode: 'required|string',
        street: 'required|string',
        number: 'required|string',
        complement: 'string',
        district: 'required|string',
        city: 'required|string',
        state: 'required|string|size:2'
      }
    }
  }

  protected async execute (request: Request, response: Response): Promise<Response> {
    const restaurant = await this.interactors
      .restaurant
      .registerRestaurant(request.body)

    return response.status(201).send({ restaurant })
  }
}
