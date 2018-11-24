const clean = require('../src/clean');
const { reporter } = require('@carbon/cli-reporter');

clean().catch(error => {
  reporter.error(error);
});
