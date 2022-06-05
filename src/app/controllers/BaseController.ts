import { Interactors } from '@/interactors'
import { Request, Response } from 'express'
import Authentication from '../middleware/Authentication'
import HandleError from '../middleware/HandleError'
import ValidateRequest from '../middleware/ValidateRequest'

export abstract class BaseController {
  constructor (protected interactors: Interactors) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      ValidateRequest.execute(request, this.expectedRequest)
      return await this.execute(request, response)
    } catch (error) {
      return HandleError.execute(error, response)
    }
  }

  protected getUserID (request: Request): string {
    const authentication = new Authentication()
    return authentication.decodeAccessToken(request.headers.authorization)
  }

  protected abstract expectedRequest: {}
  protected abstract execute (request: Request, response: Response): Promise<Response>
}

export { Response, Request } from 'express'
