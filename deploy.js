const ghpages = require('gh-pages');
const path = require('path');

const options = {
  remote: 'origin',
  logger: (message) => {
    console.log(message); // eslint-disable-line no-console
  },
};

ghpages.publish(path.join(__dirname, '.gh-pages'), options, (err) => {
  if (err) throw err;
});
