// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-103999&t=cMvnFTYLPEhzhIpj-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/CodeSnippet/CodeSnippet.tsx
// component=CodeSnippet

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const snippetText = figma.selectedInstance.findText(
  '$ npm install --save carbon-components'
);
const children =
  snippetText.type !== 'ERROR'
    ? snippetText.textContent
    : '$ npm install --save carbon-components';
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true });

export default {
  id: 'CodeSnippet',
  imports: ["import { CodeSnippet } from '@carbon/react';"],
  example: figma.code`<CodeSnippet type="single" feedback="Copied to clipboard"${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}>
  ${figma.helpers.react.renderChildren(children)}
</CodeSnippet>`,
};
