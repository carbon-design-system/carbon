/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// NOTE: `Array.from()` and `Object.assign()` and event constructor are covered by `@webcomponents/webcomponents-platform`
// NOTE: The need of iterator (`for` ... `of` loop) support is not revealed by Storybook,
// but by testing `carbon-web-components-with-polyfills.js` stand-alone
import 'core-js/modules/es.array.find.js';
import 'core-js/modules/es.math.sign.js';
import 'core-js/modules/es.symbol.js';
import 'core-js/modules/es.symbol.iterator.js';
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/es.object.is.js'; // For src/globals/directives/spread.ts
import 'core-js/modules/es.object.values.js';
import 'core-js/modules/es.object.entries';

import ResizeObserver from 'resize-observer-polyfill';

import './element-closest';
import './element-matches';
import './toggle-attribute';
import './toggle-class';

import 'es6-promise/auto';

import '@webcomponents/webcomponents-platform';
import '@webcomponents/template/template.js';
import '@webcomponents/shadydom/src/shadydom.js';
import '@webcomponents/custom-elements/src/custom-elements.js';
import '@webcomponents/shadycss/entrypoints/scoping-shim.js';
import '@webcomponents/url/url.js';

if (typeof ResizeObserver === 'undefined') {
  (window as any).ResizeObserver = ResizeObserver;
}
