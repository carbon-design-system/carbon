/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import packageJson from '../../../package.json';

/* eslint-disable max-len */

/**
 *
 */
/**
 * Renders the component(s) script tag content and returns back the string
 *
 * @param {Array} components array of component names
 * @param {string} tag tag folder
 */
function _renderScript(components, tag) {
  let scripts = '';
  components.forEach((component) => {
    scripts += `<script type="module" src="https://1.www.s81c.com/common/carbon/web-components/${tag}/${component}.min.js"></script>\n`;
  });
  return scripts;
}

/**
 * This is the markdown block for JS via CDN
 *
 * @param {Array} components array of components to render
 * @param components.components components to render
 */
export const cdnJs = ({ components }) => {
  return `
 ### JS (via CDN)

 > NOTE: Only one version of artifacts should be used. Mixing versions will cause rendering issues.

 \`\`\`html
 // SPECIFIC VERSION (available starting v2.0.0)
 ${_renderScript(components, `version/v${packageJson.version}`)}
 \`\`\`

 #### Right-to-left (RTL) versions

 \`\`\`html
 // SPECIFIC VERSION (available starting v2.0.0)
 ${_renderScript(components, `version/v${packageJson.version}`)}
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
