import EntityNotFound from '@/errors/EntityNotFound'
import NotAuthorized from '@/errors/NotAuthorized'
import Repository from '@/repositories/Repository'
import toolbox from '@/toolbox/toolbox'
import Account from '../Account'

export interface LoginDTO {
  email: string
  password: string
}

export type ShowAccountDTO = Omit<Account, 'password'>

export default class Login {
  constructor (private repository: Repository<Account>) {}

  async execute (data: LoginDTO): Promise<ShowAccountDTO> {
    const [account] = await this.repository.select({ email: data.email })
    if (!account) throw new EntityNotFound('Account')

    const compareHash = toolbox.hashCompare(account.password, data.password)
    if (!compareHash) throw new NotAuthorized('Incorrect password')

    const showAccount: ShowAccountDTO = {
      name: account.name,
      email: account.email,
      phone: account.phone,
      userID: account.userID
    }

    return showAccount
  }
}
