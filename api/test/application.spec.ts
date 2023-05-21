import Application from './application'

const application = new Application()

beforeAll(async () => await application.setup())

beforeEach(async function resetRepos () {
  await Promise.all(
    Object.values(application.repositories)
      .map(repo => repo.remove({}))
  )
})

export default application
