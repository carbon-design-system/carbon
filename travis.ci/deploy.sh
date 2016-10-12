#! /bin/bash

mv travis.ci/.npmrc .
npm install @console/console-npm-scripts
mv ./.npmrc travis.ci
./node_modules/@console/console-npm-scripts/deploy.sh
