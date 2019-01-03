#!/usr/bin/env bash

#
# Run it via `yarn all` to run all builds, linting, testing etc.
# Useful to test locally all commands which will be run on CI
#

# Just in case, run yarn install too
yarn install --frozen-lockfile

yarn lint-fix

# API
yarn api:build
yarn api:test:ci
yarn api:e2e

# NPM packages
yarn modules:build
yarn modules:test:ci

# Demo app
yarn build
yarn test:ci
