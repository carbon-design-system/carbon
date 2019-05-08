/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const CarbonIcons = require('@carbon/icons');
const {
  formatAttributes,
  getAttributes,
  toString,
} = require('@carbon/icon-helpers');
const { SafeString } = require('handlebars');

function iconHelper(name, attributes = {}, options = {}) {
  const icon = CarbonIcons[name];
  if (!icon) {
    throw new Error(`Unable to find the icon: \`${name}\``);
  }
  const content = icon.content.map(toString);
  const attrs = {
    ...icon.attrs,
    ...Object.assign({}, attributes.hash || attributes, options.hash),
  };
  return new SafeString(
    `<svg ${formatAttributes(getAttributes(attrs))}>${content.join('')}</svg>`
  );
}

module.exports = exports = function register({ handlebars }) {
  return handlebars.registerHelper('carbon-icon', iconHelper);
};
exports.iconHelper = iconHelper;
