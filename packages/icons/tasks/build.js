'use strict';

const build = require('../src/build');
const search = require('../src/search');
const { SVG_DIR } = require('../src/paths');

build(SVG_DIR, { cwd: process.cwd() }).catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
});
