const build = require('../src/build');
const { reporter } = require('@carbon/cli-reporter');

build().catch(error => {
  reporter.error(error);
});
