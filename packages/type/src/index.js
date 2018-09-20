'use strict';

const fontFamilies = require('./fontFamilies');
const { baseFontSize, getTypeSize, scale } = require('./scale');
const tokens = require('./tokens');

module.exports = {
  baseFontSize,
  fontFamilies,
  getTypeSize,
  scale,
  tokens,
};
