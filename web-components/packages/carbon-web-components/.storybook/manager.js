/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from '@storybook/addons';
import yourTheme from './theme';

addons.setConfig({
  theme: yourTheme,
});

/**
 * Conditionally generate CSS to hide a component based on its corresponding
 * feature flag environment variable.
 *
 * @param {*} envVar
 *   Environment variable to check.
 * @param {*} cssId
 *   CSS ID for selector.
 * @returns
 */
const getCss = (envVar, cssId) => {
  return envVar !== 'true'
    ? `button[id^="${cssId}"] { display: none !important; }\n`
    : '';
};

// Build string of CSS rules.
let css = '';
if (!process.env.CDS_FLAGS_ALL) {
  css += getCss(
    process.env.CDS_EXPERIEMENTAL_COMPONENT_NAME,
    'components-experimental-component-name'
  );
}

// Inject any CSS rules into the page.
if (css.length) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}
