'use strict';

const CarbonIcons = require('@carbon/icons');
const {
  formatAttributes,
  getAttributes,
  toString,
} = require('@carbon/icon-helpers');
const { SafeString } = require('handlebars');

function iconHelper(name, { hash = {} } = {}) {
  const icon = CarbonIcons[name];
  if (!icon) {
    throw new Error(`Unable to find the icon: \`${name}\``);
  }
  const content = icon.content.map(toString);
  const attrs = {
    ...icon.attrs,
    ...hash,
  };
  return new SafeString(
    `<svg ${formatAttributes(getAttributes(attrs))}>${content.join('')}</svg>`
  );
}

module.exports = function register({ handlebars }) {
  return handlebars.registerHelper('carbon-icon', iconHelper);
};
exports.iconHelper = iconHelper;
