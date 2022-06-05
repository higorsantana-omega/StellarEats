
import { BaseController, Request, Response } from '../BaseController'

export default class UpdateItemController extends BaseController {
  protected expectedRequest: {} = {
    params: {
      restaurantID: 'required|string',
      itemID: 'required|string'
    },
    body: {
      name: 'string',
      description: 'string',
      price: 'string',
      type: 'string'
    }
  }

  protected async execute (request: Request, response: Response):
  Promise<Response> {
    this.getUserID(request)

    const item = await this.interactors
      .restaurant
      .updateItem(
        request.params.restaurantID,
        request.params.itemID,
        request.body
      )

    return response.status(200).send({ item })
  }
}
