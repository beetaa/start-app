module.exports = {
  preset: 'jest-puppeteer',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: ['node_modules', '<rootDir>/src/'],
  testMatch: ['**/?(*.)+(spec|test).ts']
}
