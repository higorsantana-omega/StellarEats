import EntityNotFound from '@/errors/EntityNotFound'
import IncompleteRequest from '@/errors/IncompleteRequest'
import NotAllowed from '@/errors/NotAllowed'
import NotAuthorized from '@/errors/NotAuthorized'
import { Response } from 'express'

class HandleError {
  execute (err: Error, response: Response): Response {
    if (err instanceof IncompleteRequest) response.status(400)

    else if (err instanceof NotAuthorized) response.status(401)

    else if (err instanceof NotAllowed) response.status(403)

    else if (err instanceof EntityNotFound) response.status(404)

    else {
      response.status(500)
    }

    return response.send({ errors: err.message || 'An error occurred.' })
  }
}

export default new HandleError()
