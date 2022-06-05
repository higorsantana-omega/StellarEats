import { Interactors } from '@/interactors'
import { Request, Response } from 'express'
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

  protected abstract expectedRequest: {}
  protected abstract execute (request: Request, response: Response): Promise<Response>
}

export { Response, Request } from 'express'
