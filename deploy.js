const ghpages = require('gh-pages');
const path = require('path');

const options = {
  remote: 'upstream',
  logger: (message) => {
    console.log(message);
  },
};

ghpages.publish(path.join(__dirname, '.gh-pages'), options, (err) => {
  if (err) throw err;
});
