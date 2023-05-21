import { Repositories } from '@/repositories'
import toolbox from '@/toolbox/toolbox'
import AccountInteractor from './account'
import RestaurantInteractor from './restaurant'

export type Interactors = ReturnType<typeof createInteractors>

export default function createInteractors (
  repositories: Repositories
) {
  return {
    account: new AccountInteractor(repositories.account, toolbox),
    restaurant: new RestaurantInteractor(repositories.restaurant, toolbox)
  }
}
