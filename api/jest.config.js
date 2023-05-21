module.exports = {
  roots: ['<rootDir>/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/app/*.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/errors/*.ts',
    '!<rootDir>/src/repositories/*.ts',
    '!<rootDir>/src/app/middleware/*.ts',
    '!<rootDir>/src/app/controllers/BaseController.ts',
    '!**/test/**'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/test/application.spec.ts']
}
