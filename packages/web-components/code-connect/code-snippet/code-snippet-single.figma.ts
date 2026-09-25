// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-103999&t=cMvnFTYLPEhzhIpj-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/code-snippet/code-snippet.ts
// component=cds-code-snippet

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const snippetText = figma.selectedInstance.findText(
  '$ npm install --save carbon-components'
);
const children =
  snippetText.type !== 'ERROR'
    ? snippetText.textContent
    : '$ npm install --save carbon-components';
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true });

export default {
  id: 'cds-code-snippet',
  imports: [
    "import '@carbon/web-components/es/components/code-snippet/index.js'",
  ],
  example: figma.code`<cds-code-snippet type="single" feedback="Copied to clipboard" tooltip-content="Copy to clipboard"${renderBooleanAttribute(
    'disabled',
    disabled
  )}>${children}</cds-code-snippet>`,
};
