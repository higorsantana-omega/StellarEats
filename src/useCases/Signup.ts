import NotAllowed from '@/errors/NotAllowed'
import Repository from '@/repositories/Repository'
import toolbox from '@/toolbox/toolbox'

export type Account = {
  userID: string
  name: string
  email: string
  phone: string
}

type SignupDTO = Omit<Account, 'userID'>

export default class Signup {
  constructor (private repository: Repository<Account>) {}

  async execute (data: SignupDTO): Promise<Account> {
    const [accountFound] = await this.repository.select({ email: data.email })
    if (accountFound) throw new NotAllowed('Email already exist')

    const account: Account = {
      userID: toolbox.generateUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone
    }

    await this.repository.save(account)
    return account
  }
}
