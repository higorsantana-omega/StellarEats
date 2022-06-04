import toolbox from '@/toolbox/toolbox'

export type Account = {
  userID: string
  name: string
  email: string
  phone: string
}

type SignupDTO = Omit<Account, 'userID'>

export default class Signup {
  async execute (data: SignupDTO): Promise<Account> {
    const account: Account = {
      userID: toolbox.generateUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone
    }

    return account
  }
}
