/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Settings.
 * @exports CarbonComponents.settings
 * @type Object
 * @property {boolean} [disableAutoInit]
 *   Disables automatic instantiation of components.
 *   By default (`CarbonComponents.disableAutoInit` is `false`),
 *   carbon-components attempts to instantiate components automatically
 *   by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 *   or upon DOM events (e.g. clicking) on such elements.
 *   See each components' static `.init()` methods for details.
 * @property {string} [prefix=bx]
 *   Brand prefix. Should be in sync with `$prefix` Sass variable in carbon-components/src/globals/scss/_vars.scss.
 * // @todo given that the default value is so long, is it appropriate to put in the JSDoc?
 * @property {string} [selectorTabbable]
 *   A selector selecting tabbable/focusable nodes.
 *   By default selectorTabbable refereneces links, areas, inputs, buttons, selects, textareas,
 *   iframes, objects, embeds, or elements explicitly using tabindex or contenteditable attributes
 *   as long as the element is not `disabled` or the `tabindex="-1"`.
 */
const settings = {
  prefix: 'bx',
  selectorTabbable: `
    a[href], area[href], input:not([disabled]):not([tabindex='-1']),
    button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
    textarea:not([disabled]):not([tabindex='-1']),
    iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]
  `,
};

module.exports = settings;
