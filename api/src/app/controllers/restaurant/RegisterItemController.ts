
import { BaseController, Request, Response } from '../BaseController'

export default class RegisterItemController extends BaseController {
  protected expectedRequest: {} = {
    params: {
      restaurantID: 'required|string'
    },
    body: {
      name: 'required|string',
      description: 'required|string',
      price: 'required|string',
      type: 'required|string'
    }
  }

  protected async execute (request: Request, response: Response):
  Promise<Response> {
    this.getUserID(request)

    const item = await this.interactors
      .restaurant
      .registerItem(request.params.restaurantID, request.body)

    return response.status(201).send({ item })
  }
}
