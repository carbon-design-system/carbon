#! /bin/bash
# build sandbox and deploy sandbox + coverage information to gh-pages
npm run build-storybook && npm run gh-pages

npm run build-es5

npm install @console/console-npm-scripts
./node_modules/@console/console-npm-scripts/deploy.sh
