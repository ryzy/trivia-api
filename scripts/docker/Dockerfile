FROM node:10.15.0-alpine

# Add package.json so we can install all deps
ADD package.json yarn.lock /app/
RUN cd /app && yarn install

# Add compiled trivia-api dir
ADD dist/api/trivia-api/src /app/
# Add compiled ngx-trivia-api NPM dep, so we use the fresh/local version, instead of potentially outdated from package.json
ADD dist/ngx-trivia-api /app/node_modules/ngx-trivia-api/

CMD ["node", "/app/main.js"]
