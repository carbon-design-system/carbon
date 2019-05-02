'use strict';

const { createTransformer } = require('babel-jest');
const packageJson = require('../../package.json');

// This is a custom Jest transformer that process *.js files
// http://facebook.github.io/jest/docs/tutorial-webpack.html
module.exports = createTransformer(packageJson.babel);
