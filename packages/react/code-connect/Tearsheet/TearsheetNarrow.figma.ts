// url=https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9837%3A338231
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tearsheet/Tearsheet.tsx
// component=TearsheetNarrow

/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const header = instance.findInstance('R:2 | Tearsheet header item');
  const titleText = header.type !== 'ERROR' ? header.findText('Title') : null;
  const title =
    titleText && titleText.type !== 'ERROR' ? titleText.textContent : undefined;

  const descText =
    header.type !== 'ERROR' ? header.findText('Description') : null;
  const description =
    descText && descText.type !== 'ERROR' ? descText.textContent : undefined;

  const hasButtons = instance.getBoolean('Buttons');
  const footerItem = hasButtons
    ? instance.findInstance('R:2 | Tearsheet footer item')
    : null;
  const buttonCount =
    footerItem && footerItem.type !== 'ERROR'
      ? footerItem.getEnum('Buttons', {
          '1': '1',
          '2': '2',
          '3': '3',
          '4': '4',
        })
      : undefined;

  let actionsCode: ReturnType<typeof figma.code> | undefined;
  if (hasButtons && buttonCount) {
    if (buttonCount === '1') {
      actionsCode = figma.code`{[
    {
      key: 1,
      kind: 'primary',
      label: 'Button',
      loading: false,
      onClick: () => console.log('clicked primary'),
    },
  ]}`;
    } else if (buttonCount === '2') {
      actionsCode = figma.code`{[
    {
      key: 1,
      kind: 'primary',
      label: 'Button',
      loading: false,
      onClick: () => console.log('clicked primary'),
    },
    {
      key: 2,
      kind: 'secondary',
      label: 'Button',
      onClick: () => console.log('clicked secondary'),
    },
  ]}`;
    } else if (buttonCount === '3') {
      actionsCode = figma.code`{[
    {
      key: 1,
      kind: 'primary',
      label: 'Button',
      loading: false,
      onClick: () => console.log('clicked primary'),
    },
    {
      key: 2,
      kind: 'secondary',
      label: 'Button',
      onClick: () => console.log('clicked secondary'),
    },
    {
      key: 3,
      kind: 'ghost',
      label: 'Button',
      loading: false,
      onClick: () => console.log('clicked ghost'),
    },
  ]}`;
    } else if (buttonCount === '4') {
      actionsCode = figma.code`{[
    {
      key: 1,
      kind: 'primary',
      label: 'Button',
      loading: false,
      onClick: () => console.log('clicked primary'),
    },
    {
      key: 2,
      kind: 'secondary',
      label: 'Button',
      onClick: () => console.log('clicked secondary'),
    },
    {
      key: 3,
      kind: 'tertiary',
      label: 'Button',
      onClick: () => console.log('clicked tertiary'),
    },
    {
      key: 4,
      kind: 'ghost',
      label: 'Button',
      onClick: () => console.log('clicked ghost'),
    },
  ]}`;
    }
  }

  const children = instance
    .findConnectedInstances(
      (child) =>
        child.name === '_Tearsheet content - Narrow' && child.hasCodeConnect()
    )
    .map((child) => child.executeTemplate().example);

  return {
    id: 'TearsheetNarrow',
    imports: ["import { Tearsheet } from '@carbon/react';"],
    example: figma.code`<Tearsheet
  open
  variant="narrow"${figma.helpers.react.renderProp(
    'title',
    title
  )}${figma.helpers.react.renderProp('description', description)}${
    actionsCode ? figma.code`\n  actions=${actionsCode}` : ''
  }>
  ${figma.helpers.react.renderChildren(children)}
</Tearsheet>`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
