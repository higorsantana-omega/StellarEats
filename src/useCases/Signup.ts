type Account = {
  name: string
  email: string
  phone: string
}

type SignupDTO = Account

export default class Signup {
  async execute (data: SignupDTO): Promise<Account> {
    const account: Account = {
      name: data.name,
      email: data.email,
      phone: data.phone
    }

    return account
  }
}
