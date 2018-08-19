'use strict';

const build = require('../src/build');

build().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
});
