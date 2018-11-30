'use strict';

const { toString: iconHelpersToString } = require('@carbon/icon-helpers');

/**
 * @param {Object} descriptor The icon desciptor, in `@carbon/icons` format.
 * @returns {string} The Handlebars partial from the given icon.
 */
function js2partial(descriptor) {
  const formattedAttrs = [
    '{{#each this}}',
    '{{#startsWith "attr-" @key}}',
    ` {{removeFirst @key "attr-"}}="{{this}}"`,
    '{{/startsWith}}',
    '{{/each}}',
  ].join('');
  return iconHelpersToString(descriptor)
    .replace(/^\s*(<svg)/, `$1${formattedAttrs}`)
    .replace(/(<\/svg>)\s*$/, '{{#if attr-aria-label}}<title>{{attr-aria-label}}</title>{{/if}}$1');
}

module.exports = js2partial;
