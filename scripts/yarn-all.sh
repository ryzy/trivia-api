#!/usr/bin/env bash

#
# Run it via `yarn all` to run all builds, linting, testing etc.
# Useful to test locally all commands which will be run on CI
#
set -xeuo pipefail

# Just in case, run yarn install too
yarn install --frozen-lockfile

yarn lint-fix

# API
yarn api:build
yarn api:test:ci
yarn api:e2e

# NPM packages
yarn ng build ngx-image-api
yarn ng test ngx-image-api --coverage

# Demo app
yarn ng build demo-app
yarn ng test demo-app --coverage
