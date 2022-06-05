import EntityNotFound from '@/errors/EntityNotFound'
import NotAuthorized from '@/errors/NotAuthorized'
import createRepositories, { Repositories } from '@/repositories'
import application from '@test/application.spec'

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
    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'
    const password = '12345678'

    await application
      .interactors
      .account
      .signup({
        name,
        email,
        phone,
        password
      })

    const loginSuccess = await application
      .interactors
      .account
      .login({ email, password })

    expect(loginSuccess.email).toBe(email)
    expect(loginSuccess.name).toBe(name)
  })

  it('should not be able to login if password is incorrect', async () => {
    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'
    const password = '12345678'

    await application
      .interactors
      .account
      .signup({
        name,
        email,
        phone,
        password
      })

    const incorrectPassword = '1111'

    await expect(
      application
        .interactors
        .account
        .login({ email, password: incorrectPassword })
    ).rejects.toEqual(new NotAuthorized('Incorrect password'))
  })

  it('should return an error if account not exist', async () => {
    await expect(
      application
        .interactors
        .account
        .login({
          email: 'any@mail.com',
          password: 'anypassword'
        })
    ).rejects.toEqual(new EntityNotFound('Account'))
  })
})
