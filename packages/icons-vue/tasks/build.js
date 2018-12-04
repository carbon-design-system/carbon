'use strict';

const path = require('path');
const build = require('../src/build');

build({ cwd: path.resolve(__dirname, '../') }).catch(error => {
  console.log(error);
});
