// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],

  testRegex: '.spec.ts$',
  transform: {
    '.+\\.(t|j)s$': 'ts-jest',
  },
  // testEnvironment: 'node',

  cache: true,
  verbose: false,

  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
  },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', 'main.ts', 'environment/*.ts'],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: '../../dist/coverage/api',

  /**
   * Provide our mocks, apart of what jest-preset-angular and /@angular-builders/jest provides
   */
  setupFiles: ['../../jest-mocks.js'],

  /**
   * Build artefacts collide with actual libs/, so exclude them here
   */
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};
