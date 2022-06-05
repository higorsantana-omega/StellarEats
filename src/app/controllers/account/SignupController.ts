
import { BaseController, Request, Response } from '../BaseController'

export default class SignupController extends BaseController {
  protected expectedRequest: {} = {
    body: {
      name: 'required|string',
      email: 'required|string',
      phone: 'required|string',
      password: 'required|string'
    }
  }

  protected async execute (request: Request, response: Response): Promise<Response> {
    const account = await this.interactors
      .account
      .signup(request.body)

    return response.status(201).send({ account })
  }
}
