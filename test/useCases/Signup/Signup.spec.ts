import NotAllowed from '@/errors/NotAllowed'
import createRepositories, { Repositories } from '@/repositories'
import Signup from '@/useCases/Signup'

let repository: Repositories

describe('Signup', () => {
  beforeAll(async () => {
    repository = await createRepositories()
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(repository)
        .map(repository => repository.remove({}))
    )
  })

  it('should create an account', async () => {
    const signup = new Signup(repository.account)

    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'

    const account = await signup.execute({
      name,
      email,
      phone
    })

    expect(typeof account.userID).toBe('string')
    expect(account.name).toBe(name)
    expect(account.email).toBe(email)
    expect(account.phone).toBe(phone)

    const [addedUser] = await repository
      .account
      .select({ userID: account.userID })

    expect(addedUser.email).toBe(email)
  })

  it('should not be able create user already exists', async () => {
    const signup = new Signup(repository.account)

    const name = 'any name'
    const email = 'any2@mail.com'
    const phone = '79992952868'

    await signup.execute({
      name,
      email,
      phone
    })

    await expect(
      signup.execute({
        name: 'any name user',
        phone: '998294045',
        email
      })
    ).rejects.toEqual(new NotAllowed('Email already exist'))
  })
})
