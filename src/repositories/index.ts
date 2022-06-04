import createMongoRepositories from './mongodb'
import Repository from './Repository'

import Account from '@/useCases/account/Account'

export interface Repositories {
  account: Repository<Account>
}

export default async function createRepositories (): Promise<Repositories> {
  return await createMongoRepositories()
}
