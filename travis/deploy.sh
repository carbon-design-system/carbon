#! /bin/bash

mv travis/.npmrc .
npm install @console/console-npm-scripts
mv ./.npmrc travis
./node_modules/@console/console-npm-scripts/deploy.sh