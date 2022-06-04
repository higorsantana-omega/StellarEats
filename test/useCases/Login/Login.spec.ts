import NotAuthorized from '@/errors/NotAuthorized'
import createRepositories, { Repositories } from '@/repositories'
import Login from '@/useCases/account/Login'
import Signup from '@/useCases/account/Signup'

let repository: Repositories

describe('Login', () => {
  beforeAll(async () => {
    repository = await createRepositories()
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(repository)
        .map(repository => repository.remove({}))
    )
  })

  it('should be able to login in an existing account', async () => {
    const signup = new Signup(repository.account)

    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'
    const password = '12345678'

    await signup.execute({
      name,
      email,
      phone,
      password
    })

    const login = new Login(repository.account)

    const loginSuccess = await login.execute({ email, password })

    expect(loginSuccess.email).toBe(email)
    expect(loginSuccess.name).toBe(name)
  })

  it('should not be able to login if password is incorrect', async () => {
    const signup = new Signup(repository.account)

    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'
    const password = '12345678'

    await signup.execute({
      name,
      email,
      phone,
      password
    })

    const login = new Login(repository.account)

    const incorrectPassword = '1111'

    await expect(
      login.execute({
        email, password: incorrectPassword
      })
    ).rejects.toEqual(new NotAuthorized('Incorrect password'))
  })
})
