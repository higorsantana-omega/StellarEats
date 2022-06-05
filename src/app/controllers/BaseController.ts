import { Interactors } from '@/interactors'
import { Request, Response } from 'express'

export abstract class BaseController {
  constructor (protected interactors: Interactors) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      return await this.execute(request, response)
    } catch (error) {
      console.log(error)
    }
  }

  protected abstract execute (request: Request, response: Response): Promise<Response>
}

export { Response, Request } from 'express'
