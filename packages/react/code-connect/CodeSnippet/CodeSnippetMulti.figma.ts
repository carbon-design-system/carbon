// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4257-168802&t=cMvnFTYLPEhzhIpj-4
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
const isSkeleton = instance.getEnum('State', { Skeleton: true });

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'CodeSnippetSkeleton',
      imports: ["import { CodeSnippetSkeleton } from '@carbon/react';"],
      example: figma.code`<CodeSnippetSkeleton type="multi" />`,
    };
  }

  const hideCopyButton = !instance.getBoolean('Copy');
  const disabled = instance.getEnum('State', { Disabled: true });

  return {
    id: 'CodeSnippet',
    imports: ["import { CodeSnippet } from '@carbon/react';"],
    example: figma.code`<CodeSnippet type="multi" feedback="Copied to clipboard"${figma.helpers.react.renderProp(
      'hideCopyButton',
      hideCopyButton
    )}${figma.helpers.react.renderProp('disabled', disabled)}>
  Code sample here
</CodeSnippet>`,
  };
}

export default createTemplate();
