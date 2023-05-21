# uaifood-api

![](https://img.shields.io/badge/coverage-100%25-success)

[API](https://uaifood-api-v1.herokuapp.com/)
[API Docs](https://uaifood-api-v1.herokuapp.com/api-docs)

### About Development

- Technologies: Node, express, typescript, jest, mongodb, swagger
- Design patterns: Interactors/Facade, Factory, Repository
- CI/CD

#### Functionalities

Signup, Login and Authentication (using jwt)
Register a restaurant and an item
Filter restaurants by city, gastronomy, food

#### Code

I used eslint to ensure code standardization
I used swagger to documentation the application

#### Commits

To standardize the commits I used the conventional commits pattern. Before making a commit, the husky will check if the message follows the pattern of conventional commits. And it will also run all tests using lint-staged before commiting.

#### Structure

- Entities (interface) = Data related entirely to business logic
- Use cases (heritage and polymorphism) = They have complete freedom to modify the entities
- Interactors = Communication with use cases will be done through it
- Controllers = Used by the router and use interactors

#### Tests

Unit testing and integration testing.

To run test use the follow command: ```$ npm run test```
To get test coverage use the follow command: ```$ npm run test-ci```

#### Build

To compile the application I used rimraf, because it is fast.
To run application:
```
$ npm i
$ npm build
$ npm start
$ http://localhost:5000