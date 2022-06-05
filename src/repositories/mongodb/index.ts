import { MongoClient } from 'mongodb'
import MongoRepository from './MongoRepository'
import { Repositories } from '..'

import Account from '@/useCases/account/Account'
import Restaurant from '@/useCases/restaurant/Restaurant'

export default async function createMongoRepositories (): Promise<Repositories> {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useUnifiedTopology: true
  })

  await client.connect()
  const database = client.db('uaifood_test')

  return {
    account: new MongoRepository<Account>('userID', 'account', database),
    restaurant: new MongoRepository<Restaurant>('restaurantID', 'restaurant', database)
  }
}
