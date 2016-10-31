/**
  * This script is used to deploy GitHub Pages form Travis CI.
  * That is why the name and email are specified in options.user
  **/

const ghpages = require('gh-pages');
const path = require('path');

const options = {
  remote: 'origin',
  logger: (message) => {
    console.log(message); // eslint-disable-line no-console
  },
  user: {
    name: 'travis',
    email: 'travis',
  },
};

ghpages.publish(path.join(__dirname, '..', '.gh-pages'), options, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Published to GitHub Pages'); // eslint-disable-line no-console
  }
});
