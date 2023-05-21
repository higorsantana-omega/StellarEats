import 'module-alias/register'
import { createServer } from 'http'
import createApp from './app'
import createInteractors from './interactors'
import createRepositories from './repositories'

async function main () {
  const repositories = await createRepositories()
  const interactors = createInteractors(repositories)

  const app = await createApp(interactors)

  const httpServer = createServer(app)
  const port = process.env.PORT || 5000

  httpServer
    .listen(port)
    .on('listening', () => console.log(`Node app is running on ${port}`))
}

main()
