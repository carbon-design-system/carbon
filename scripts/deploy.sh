#! /bin/bash
npm run build-es5

npm install @console/console-npm-scripts
./node_modules/@console/console-npm-scripts/deploy.sh

npm run deploy
