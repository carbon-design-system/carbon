// url=https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=50111-991&mode=design&t=kyFCPK0tCeufcNP2-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Link/Link.tsx
// component=Link

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const inline = instance.getEnum('Type', {
  Inline: true,
  Standalone: false,
});
const linkText = instance.getString('Link text');
const renderIcon = instance
  .getInstanceSwap('Swap icon')
  ?.executeTemplate().example;
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const disabled = instance.getEnum('State', {
  Disabled: true,
});

export default {
  id: 'Link',
  imports: ["import { Link } from '@carbon/react';"],
  example: figma.code`<Link href="#"${figma.helpers.react.renderProp(
    'inline',
    inline
  )}${figma.helpers.react.renderProp(
    'renderIcon',
    renderIcon
  )}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('disabled', disabled)}>
  ${figma.helpers.react.renderChildren(linkText)}
</Link>`,
  metadata: { nestable: true },
};
