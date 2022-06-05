import createInteractors, { Interactors } from '@/interactors'
import { Repositories } from '@/repositories'
import createMongoRepositories from '@/repositories/mongodb'

export default class Application {
  public repositories: Repositories
  public interactors: Interactors

  async setup (): Promise<void> {
    this.repositories = await createMongoRepositories()
    this.interactors = createInteractors(this.repositories)
  }
}
