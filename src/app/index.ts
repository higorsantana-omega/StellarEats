import { Interactors } from '@/interactors'
import express from 'express'

export default async function createApp (interactors: Interactors) {
  const app = express()

  app.disable('etag')

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  return app
}
