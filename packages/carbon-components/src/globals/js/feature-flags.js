/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the list of the default values of compile-time feature flags.
 *
 * Build toolchain can replace variable here and/or the references
 * in order to apply non-default values to those feature flags.
 *
 * @example Render `foo` if `aFeatureFlag` is `true`, render `bar` otherwise.
 * // `my-component.config.js`
 * const { aFeatureFlag } = require('/path/to/feature-flags');
 * ...
 * module.exports = {
 *   variants: [
 *     {
 *       name: 'default',
 *       label: 'My component',
 *       context: {
 *         aFeatureFlag,
 *         ...
 *       },
 *     },
 *     ...
 *   ],
 * };
 *
 * // `my-component.hbs`
 * <div>
 *   {{#if aFeatureFlag}}
 *     foo
 *   {{else}}
 *     bar
 *   {{/if}}
 * </div>
 *
 * @example Emit `foo` upon clicking on component's element if `aFeatureFlag` is `true`, emit `bar` otherwise.
 * import mixin from '/path/to/globals/js/misc/mixin';
 * import createComponent from '/path/to/globals/js/mixins/create-component';
 * import initComponentBySearch from '/path/to/globals/js/mixins/init-component-by-search';
 * import handles from '/path/to/globals/js/mixins/handles';
 * import on from '/path/to/globals/js/misc/on';
 *
 * import { aFeatureFlag } from '/path/to/globals/js/feature-flags';
 *
 * class MyClass extends mixin(createComponent, initComponentBySearch, handles) {
 *   constructor(element, options) {
 *     super(element, options);
 *     this.manage(
 *       on(this.element, 'click', () => {
 *         console.log(aFeatureFlag ? 'foo' : 'bar');
 *       })
 *     );
 *   }
 * }
 */

exports.grid = true;
exports.gridColumns16 = false;
