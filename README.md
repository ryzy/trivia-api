# Simple Image API

API:
```
GET /image/:id
GET /images
GET /images/:query
```

## Development

Start the API:
```
yarn api:start:dev
```

Start the demo app and watch for changes in `ngx-image-api` npm module:
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
