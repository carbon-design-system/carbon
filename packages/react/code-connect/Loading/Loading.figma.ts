// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3238-28455&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Loading/Loading.tsx
// component=Loading / InlineLoading

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const isInline = instance.getEnum('Size', {
  Inline: true,
});

function createTemplate() {
  if (isInline) {
    const loadingMessage = instance.findText('Loading message');
    const description =
      loadingMessage.type !== 'ERROR' ? loadingMessage.textContent : undefined;
    const status = instance.getEnum('State', {
      Active: 'active',
      Error: 'error',
      Finished: 'finished',
      Inactive: 'inactive',
    });

    return {
      id: 'InlineLoading',
      imports: ["import { InlineLoading } from '@carbon/react';"],
      example: figma.code`<InlineLoading iconDescription="Loading"${figma.helpers.react.renderProp(
        'description',
        description
      )}${figma.helpers.react.renderProp('status', status)} />`,
      metadata: { nestable: true },
    };
  }

  const small = instance.getEnum('Size', {
    Small: true,
  });

  return {
    id: 'Loading',
    imports: ["import { Loading } from '@carbon/react';"],
    example: figma.code`<Loading withOverlay={false}${figma.helpers.react.renderProp(
      'small',
      small
    )} />`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
