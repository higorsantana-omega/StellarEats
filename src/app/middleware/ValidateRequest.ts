
import Validator, { Rules } from 'validatorjs'
import { Request } from 'express'
import IncompleteRequest from '@/errors/IncompleteRequest'

class ValidateRequest {
  execute (request: Request, expectedRequest: unknown): void {
    const validation = new Validator(request, expectedRequest as Rules)
    if (validation.fails()) {
      throw new IncompleteRequest(validation.errors.errors)
    }
  }
}

export default new ValidateRequest()
