/* eslint-disable no-console */

// Script for deploying React Storybook and Coverage information
// to GitHub pages

const ghpages = require('gh-pages');
const path = require('path');
const sh = require('shelljs');

const pagesFolder = path.join(__dirname, '..', '.gh-pages');

// always run coverage if not on travis to prevent clobbering
// or pushing stale coverage stats
if (!process.env.TRAVIS) {
  console.log('Running locally, going to generate coverage statistics');
  sh.exec('npm run coverage');
}

const options = {
  remote: 'origin',
  logger: (message) => {
    console.log(message);
  },
};

// provide user and email if the script is invoked on Travis CI
if (process.env.TRAVIS) {
  options.user = {
    name: 'travis',
    email: 'travis',
  };
}

ghpages.publish(pagesFolder, options, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Published to GitHub Pages');
  }
});
