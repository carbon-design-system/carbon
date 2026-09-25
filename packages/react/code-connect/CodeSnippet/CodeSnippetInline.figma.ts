// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-104904&t=cMvnFTYLPEhzhIpj-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/CodeSnippet/CodeSnippet.tsx
// component=CodeSnippet

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const codeSnippet = instance.findInstance('Code snippet');
const snippetText =
  codeSnippet.type !== 'ERROR' ? codeSnippet.findText('node -v') : null;
const tooltip = instance.findInstance('Tooltip content');
const tooltipText =
  tooltip.type !== 'ERROR' ? tooltip.findText('Tooltip text') : null;
const children =
  snippetText && snippetText.type !== 'ERROR'
    ? snippetText.textContent
    : 'node -v';
const feedback =
  instance.getEnum('Tooltip', { True: true }) &&
  tooltipText &&
  tooltipText.type !== 'ERROR'
    ? tooltipText.textContent
    : 'Copied to clipboard';
const disabled = instance.getEnum('State', { Disabled: true });

export default {
  id: 'CodeSnippet',
  imports: ["import { CodeSnippet } from '@carbon/react';"],
  example: figma.code`<CodeSnippet type="inline"${figma.helpers.react.renderProp(
    'feedback',
    feedback
  )}${figma.helpers.react.renderProp('disabled', disabled)}>
  ${figma.helpers.react.renderChildren(children)}
</CodeSnippet>`,
};
