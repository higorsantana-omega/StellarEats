import { Repositories } from '@/repositories'
import toolbox from '@/toolbox/toolbox'
import AccountInteractor from './account'

export type Interactors = ReturnType<typeof createInteractors>

export default function createInteractors (
  repositories: Repositories
) {
  return {
    account: new AccountInteractor(repositories.account, toolbox)
  }
}
