import Signup from '@/useCases/Signup'

describe('Signup', () => {
  it('should create an account', async () => {
    const signup = new Signup()

    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'

    const account = await signup.execute({
      name,
      email,
      phone
    })

    expect(account.name).toBe(name)
    expect(account.email).toBe(email)
    expect(account.phone).toBe(phone)
  })
})
