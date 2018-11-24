const { remove } = require('fs-extra');
const paths = require('./paths');

module.exports = async function clean() {
  return Promise.all([
    remove(paths.TS),
    remove(paths.LIB),
    remove(paths.WASTE),
    remove(paths.EXAMPLES_LIB),
    remove(paths.STORIES),
  ]);
};
