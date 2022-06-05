import createMongoRepositories from './mongodb'
import Repository from './Repository'

import Account from '@/useCases/account/Account'
import Restaurant from '@/useCases/restaurant/Restaurant'

export interface Repositories {
  account: Repository<Account>
  restaurant: Repository<Restaurant>
}

export default async function createRepositories (): Promise<Repositories> {
  return await createMongoRepositories()
}
