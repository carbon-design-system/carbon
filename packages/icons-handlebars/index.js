'use strict';

const CarbonIcons = require('@carbon/icons');
const { getAttributes } = require('@carbon/icon-helpers');
const { SafeString } = require('handlebars');

function iconHelper(name, { hash = {} } = {}) {
  const icon = CarbonIcons[name];
  if (!icon) {
    throw new Error(`Unable to find the icon: \`${name}\``);
  }
  const content = icon.content.map(js2svg);
  return new SafeString(
    `<svg ${getAttributes(hash)}>${content.join('')}</svg>`
  );
}

function js2svg(descriptor) {
  const { elem, attrs, content = [] } = descriptor;

  return `<${elem} ${formatAttributes(attrs)}>${content
    .map(js2svg)
    .join('')}</${elem}>`;
}

function formatAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, key, index) => {
    const attribute = `${key}="${attrs[key]}"`;
    if (index === 0) {
      return attribute;
    }
    return acc + ' ' + attribute;
  }, '');
}

module.exports = function register({ handlebars }) {
  return handlebars.registerHelper('carbon-icon', iconHelper);
};
exports.iconHelper = iconHelper;
