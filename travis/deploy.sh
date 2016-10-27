#! /bin/bash

npm install @console/console-npm-scripts
./node_modules/@console/console-npm-scripts/deploy.sh

#run `npm run deploy` to deploy coverage and build badges and new storybook to gh-pages on builds in master branch
if [ "$TRAVIS_BRANCH" = "master" ]; then
  npm run deploy
fi
