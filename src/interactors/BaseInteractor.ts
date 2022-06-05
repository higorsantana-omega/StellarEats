import Repository from '@/repositories/Repository'
import ToolBox from '@/toolbox/IToolbox'
import { FilterQuery } from 'mongodb'

export default abstract class BaseInteractor<Entity> {
  constructor (
    protected repository: Repository<Entity>,
    protected toolbox: ToolBox
  ) {}

  async find (where: Partial<FilterQuery<Entity>>): Promise<Entity[]> {
    return this.repository.select(where)
  }
}
