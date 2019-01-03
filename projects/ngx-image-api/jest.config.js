// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
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
  collectCoverageFrom: ['projects/ngx-image-api/src/**/*.ts'],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'dist/coverage/ngx-image-api',
  coveragePathIgnorePatterns: ['/node_modules/', '/src/public_api.ts'],

  /**
   * Respect package.json `browser` field.
   * Needed eg. for bugsnag, which provides both browser and nodejs implementation.
   */
  browser: true,

  /**
   * `node_modules` dir is NOT processed by default by ts-jest
   * But some modules aren't provided as ES5 and therefore needs
   * to be transpiled. List them here.
   * NOTE: because these are .js files, tsconfig.spec.json needs to have `allowJS: true`.
   */
  // transformIgnorePatterns: ['node_modules/(?!lodash-es|ngx-webstorage)'],

  /**
   * Build artefacts collide with actual libs/, so exclude them here
   */
  modulePathIgnorePatterns: ['<rootDir>/dist'],

  /**
   * Sets everything which is needed for Angular testing
   * incl. mocks, tsConfigFile path, setupTestFrameworkScriptFile etc.
   */
  preset: 'jest-preset-angular',
};
