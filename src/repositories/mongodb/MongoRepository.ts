import Repository from '../Repository'
import { Collection, Db } from 'mongodb'

export default class MongoRepository<Entity> implements Repository<Entity> {
  private collection: Collection<Entity>

  constructor (
    private key: keyof Entity,
    collectionName: string,
    database: Db
  ) {
    this.collection = database.collection(collectionName)
  }

  async save (entity: Entity): Promise<void> {
    const filter: Partial<Entity> = {}
    filter[this.key] = entity[this.key]

    await this.collection.replaceOne(filter, entity, { upsert: true })
  }

  async select (where: Partial<Entity>): Promise<Entity[]> {
    return await this.collection
      .find(where)
      .project({ _id: 0 })
      .toArray()
  }
}
