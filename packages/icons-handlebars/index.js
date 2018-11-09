'use strict';

const { SafeString } = require('handlebars');
const CarbonIcons = require('@carbon/icons');

function iconHelper(name, { hash = {} } = {}) {
  const icon = CarbonIcons[name];
  if (!icon) {
    throw new Error(`Cannot find icon for name: ${name}`);
  }
  const content = icon.content.map(js2svg);
  const attributes = {
    focusable: false,
    ...icon.attrs,
    ...hash,
  };

  if (
    attributes['aria-label'] ||
    attributes['aria-labelledby'] ||
    attributes.focusable
  ) {
    attributes.role = 'img';
    attributes.focusable = true;
  }

  // If no accessibility-related property is passed in, set `aria-hidden` to
  // true because it is a non-interactive element. `focusable` is a special
  // case here in that we need to allow users to specify it if supplying a
  // title in children.
  if (
    !(
      attributes['aria-label'] ||
      attributes['aria-labelledby'] ||
      attributes.focusable
    )
  ) {
    attributes['aria-hidden'] = true;
  }

  return new SafeString(
    `<svg ${formatAttributes(attributes)}>${content.join('')}</svg>`
  );
}

function js2svg(descriptor) {
  const { elem, attrs, content = [] } = descriptor;

  return `<${elem} ${formatAttributes(attrs)}>${content
    .map(js2svg)
    .join('')}</${elem}>`;
}

function formatAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, key) => {
    return (acc + ' ' + `${key}="${attrs[key]}"`).trim();
  }, '');
}

module.exports = function register({ handlebars }) {
  return handlebars.registerHelper('carbon-icon', iconHelper);
};
exports.iconHelper = iconHelper;
