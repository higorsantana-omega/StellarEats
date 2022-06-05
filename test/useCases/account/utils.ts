import Account from '@/interactors/account/Account'
import application from '@test/application.spec'

export async function createAccount (): Promise<Account> {
  const randomStr = String(Math.floor(Math.random() * 900000) + 100000)
  const email = randomStr + '@mail.com'

  const account = await application
    .interactors
    .account
    .signup({
      email,
      name: 'Test user',
      password: '12345678',
      phone: '11963367456'
    })
  return account
}
