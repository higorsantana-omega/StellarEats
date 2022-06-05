import createMongoRepositories from './mongodb'
import Repository from './Repository'

import Restaurant from '@/interactors/restaurant/Restaurant'
import Account from '@/interactors/account/Account'

export interface Repositories {
  account: Repository<Account>
  restaurant: Repository<Restaurant>
}

export default async function createRepositories (): Promise<Repositories> {
  return await createMongoRepositories()
}
