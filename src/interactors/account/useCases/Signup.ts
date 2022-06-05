import NotAllowed from '@/errors/NotAllowed'
import Repository from '@/repositories/Repository'
import toolbox from '@/toolbox/toolbox'
import Account from '../Account'

export type SignupDTO = Omit<Account, 'userID'>

export default class Signup {
  constructor (private repository: Repository<Account>) {}

  async execute (data: SignupDTO): Promise<Account> {
    const [accountFound] = await this.repository.select({ email: data.email })
    if (accountFound) throw new NotAllowed('Email already exist')

    const account: Account = {
      userID: toolbox.generateUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: toolbox.encrypt(data.password)
    }

    await this.repository.save(account)
    return account
  }
}
