
import Account from '@/interactors/account/Account'
import { Request } from '../BaseController'
import AccessController from './AccessController'

export default class LoginController extends AccessController {
  protected expectedRequest: {} = {
    body: {
      email: 'required|string',
      password: 'required|string'
    }
  }

  protected async setupAccount (request: Request): Promise<void> {
    this.account = await this.interactors
      .account
      .login(request.body) as Account
  }
}
