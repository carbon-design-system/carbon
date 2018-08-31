'use strict';

const path = require('path');

const BUILD_CJS_DIR = path.resolve(__dirname, '../lib');
const BUILD_ES_DIR = path.resolve(__dirname, '../es');
const BUILD_UMD_DIR = path.resolve(__dirname, '../umd');
const BUILD_DIRS = [BUILD_ES_DIR, BUILD_CJS_DIR, BUILD_UMD_DIR];

module.exports = {
  BUILD_CJS_DIR,
  BUILD_ES_DIR,
  BUILD_UMD_DIR,
  BUILD_DIRS,
};
