# Simple Trivia API

[![CircleCI](https://circleci.com/gh/ryzy/trivia-api.svg?style=svg)](https://circleci.com/gh/ryzy/trivia-api)

[Live Demo](https://trivia-api-228116.firebaseapp.com)

API:
```
GET /google/images?q=SEARCH_QUERY
GET /unsplash/images?q=SEARCH_QUERY
GET /explain?q=SEARCH_QUERY
```

## Development

Start the API:
```
yarn api:start:dev
```

Start the demo app and watch for changes in `ngx-trivia-api` npm module:
```
yarn start
yarn modules:build --watch
```

Testing:
```
yarn api:test
yarn api:test:e2e
yarn modules:test
yarn test // for demo app
```

**HINT:** quickly run the whole CI flow with `yarn all`.
