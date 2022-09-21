/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import packageJson from '../../../package.json';

/* eslint-disable import/prefer-default-export,max-len */

/**
 *
 */
/**
 * Renders the component(s) script tag content and returns back the string
 *
 * @param {Array} components array of component names
 * @param {string} tag tag folder
 * @param {boolean} isRTL flag to show rtl version
 */
function _renderScript(components, tag, isRTL = false) {
  let scripts = '';
  const rtl = isRTL ? '.rtl' : '';
  components.forEach(component => {
    scripts += `<script type="module" src="https://1.www.s81c.com/common/carbon/web-components/${tag}/${component}${rtl}.min.js"></script>\n`;
  });
  return scripts;
}

/**
 * This is the markdown block for JS via CDN
 *
 * @param {Array} components array of components to render
 */
export const cdnJs = ({ components }) => {
  return `
 ### JS (via CDN)

 \`\`\`html
 // SPECIFIC VERSION (available starting v1.6.0)
 ${_renderScript(components, `version/v${packageJson.version}`)}

 // LATEST tag
 ${_renderScript(components, 'tag/v1/latest')}
 \`\`\`

 > NOTE: The latest tag is a moving version. While beneficial to
 > always stay on the most recent version, it is recommended to choose a specific
 > version and properly test your application when upgrading to a newer version.


 #### Right-to-left (RTL) versions

 \`\`\`html
 // SPECIFIC VERSION (available starting v1.6.0)
 ${_renderScript(components, `version/v${packageJson.version}`, true)}

 // LATEST tag
 ${_renderScript(components, 'tag/v1/latest', true)}
 \`\`\`
   `;
};

/**
 * This is the markdown block for CSS via CDN
 */
export const cdnCss = () => {
  return `
### Carbon CDN style helpers (optional)

There are optional CDN artifacts available that can assist with global Carbon
styles in lieu of including into your specific application bundle.

[Click here to learn more](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/web-components/docs/carbon-cdn-style-helpers.md)\n\n
  `;
};
