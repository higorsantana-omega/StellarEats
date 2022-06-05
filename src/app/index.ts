import { Interactors } from '@/interactors'
import express, { Request, Response, Router } from 'express'
import routes from './controllers'
import Route from './controllers/Route'

export default async function createApp (interactors: Interactors) {
  const app = express()

  app.disable('etag')

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/', createControllers(routes, interactors))

  return app
}

function createControllers (routes: Route[], interactors: Interactors) {
  const router = Router()

  routes.forEach(route => {
    const callback = (request: Request, response: Response) => {
      const controller = new route.Controller(interactors)
      return controller.handle(request, response)
    }

    switch (route.method) {
      case 'GET':
        router.get(route.url, callback)
        break

      case 'POST':
        router.post(route.url, callback)
        break

      case 'PUT':
        router.put(route.url, callback)
        break

      case 'DELETE':
        router.delete(route.url, callback)
        break

      default:
        throw new Error('Unknown HTTP method')
    }
  })

  return router
}
