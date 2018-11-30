'use strict';

const mapValues = require('lodash.mapvalues');
const icons = require('carbon-icons');
const iconsElements = require('@carbon/icons');
const classicIcons = require('./classic-icons');
const js2partial = require('./js2partial');

const iconsStable = {
  ...icons,
  ...classicIcons,
};

/**
 * @param {Object} descriptor The icon descriptor from `carbon-icons` library.
 * @returns {Object} The icon descriptor in `@carbon/icons` format.
 */
const normalizeDescriptor = ({ name, svgData, width, height, viewBox }) => {
  const attrs = { width, height, viewBox };
  return {
    name: name.replace(/^icon-+/, ''),
    size: Math.sqrt(width ** 2 + height ** 2),
    attrs: Object.keys(attrs)
      .filter(key => attrs[key])
      .reduce((o, key) => ({ ...o, [key]: attrs[key] }), {}),
    content: Object.keys(svgData)
      .filter(elem => svgData[elem])
      .reduce(
        (a, elem) => [
          ...a,
          ...svgData[elem].map(data => ({
            elem: elem.replace(/s$/, ''),
            attrs: data,
          })),
        ],
        []
      ),
  };
};

const getIconsPartials = () =>
  mapValues(iconsStable, value => {
    const descriptor = normalizeDescriptor(value);
    const { name, size } = descriptor;
    return {
      name,
      size,
      partial: js2partial(descriptor),
    };
  });

const getIconsPartialsElements = () =>
  mapValues(iconsElements, value => {
    const { name, size } = value;
    return {
      name,
      size,
      partial: js2partial(value),
    };
  });

module.exports = {
  getIconsPartials,
  getIconsPartialsElements,
};
