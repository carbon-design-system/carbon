const packageBuild = require('../src/package');
const { reporter } = require('@carbon/cli-reporter');

packageBuild().catch(error => {
  reporter.error(error);
});
