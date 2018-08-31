'use strict';

const build = require('../src/build');

build().catch(error => {
  console.error(error);
});
