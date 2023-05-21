import { FilterQuery } from 'mongodb'

export default interface Repository<Entity> {
  select(where: Partial<FilterQuery<Entity>>): Promise<Entity[]>
  save (entity: Entity): Promise<void>
  remove (where: Partial<Entity>): Promise<void>
}
