
import { Request } from '../BaseController'
import AccessController from './AccessController'

export default class SignupController extends AccessController {
  protected expectedRequest: {} = {
    body: {
      name: 'required|string',
      email: 'required|string',
      phone: 'required|string',
      password: 'required|string'
    }
  }

  protected async setupAccount (request: Request): Promise<void> {
    this.account = await this.interactors
      .account
      .signup(request.body)
  }
}
