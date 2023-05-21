import { Express } from 'express'

import createApp from '@/app'
import createInteractors, { Interactors } from '@/interactors'
import { Repositories } from '@/repositories'
import createMongoRepositories from '@/repositories/mongodb'

export default class Application {
  public repositories: Repositories
  public interactors: Interactors
  public app: Express

  async setup (): Promise<void> {
    this.repositories = await createMongoRepositories()
    this.interactors = createInteractors(this.repositories)
    this.app = await createApp(this.interactors)
  }
}
