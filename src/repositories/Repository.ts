export default interface Repository<Entity> {
  select(where: Partial<Entity>): Promise<Entity[]>
  save (entity: Entity): Promise<void>
}
