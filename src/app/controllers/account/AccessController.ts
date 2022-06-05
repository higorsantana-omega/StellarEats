import Authentication from '@/app/middleware/Authentication'
import Account from '@/interactors/account/Account'
import { BaseController, Request, Response } from '../BaseController'

export default abstract class AccessController extends BaseController {
  private authentication = new Authentication()

  async execute (request: Request, response: Response): Promise<Response> {
    await this.setupAccount(request, response)

    const accessToken = this.authentication
      .createAccessToken(this.account.userID)

    return response.status(200).send({
      ...this.additionalResponse,
      account: this.account,
      accessToken
    })
  }

  protected additionalResponse = {}
  protected account!: Account

  protected abstract setupAccount(
    request: Request,
    response: Response
  ): Promise<Response | void>
}
