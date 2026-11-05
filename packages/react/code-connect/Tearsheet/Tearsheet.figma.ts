// url=https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9837%3A338113
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tearsheet/Tearsheet.tsx
// component=Tearsheet

/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const header = instance.findInstance('_Tearsheet header');
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
      loading: false,
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

  const hasLeftPanel = instance.getBoolean('Left panel');
  const hasRightPanel = instance.getBoolean('Right panel');

  let influencer: ReturnType<typeof figma.code> | undefined;
  let influencerPosition: 'left' | 'right' | undefined;
  let influencerWidth: string | undefined;

  if (hasLeftPanel && hasRightPanel) {
    influencerPosition = 'right';
    const rightPanel = instance.findInstance('_Tearsheet right panel');
    influencerWidth =
      rightPanel.type !== 'ERROR'
        ? rightPanel.getEnum('Width', {
            '256px': 'narrow',
            '320px': 'wide',
          })
        : undefined;
    const rightChildren = instance
      .findConnectedInstances(
        (child) =>
          child.name === '_Tearsheet right panel' && child.hasCodeConnect()
      )
      .map((child) => child.executeTemplate().example);
    influencer =
      rightChildren.length > 0
        ? figma.code`${figma.helpers.react.renderChildren(rightChildren)}`
        : undefined;
  } else if (hasLeftPanel) {
    influencerPosition = 'left';
    const leftPanel = instance.findInstance('_Tearsheet left panel');
    influencerWidth =
      leftPanel.type !== 'ERROR'
        ? leftPanel.getEnum('Width', {
            '256px': 'narrow',
            '320px': 'wide',
          })
        : undefined;
    const leftChildren = instance
      .findConnectedInstances(
        (child) =>
          child.name === '_Tearsheet left panel' && child.hasCodeConnect()
      )
      .map((child) => child.executeTemplate().example);
    influencer =
      leftChildren.length > 0
        ? figma.code`${figma.helpers.react.renderChildren(leftChildren)}`
        : undefined;
  } else if (hasRightPanel) {
    influencerPosition = 'right';
    const rightPanel = instance.findInstance('_Tearsheet right panel');
    influencerWidth =
      rightPanel.type !== 'ERROR'
        ? rightPanel.getEnum('Width', {
            '256px': 'narrow',
            '320px': 'wide',
          })
        : undefined;
    const rightChildren = instance
      .findConnectedInstances(
        (child) =>
          child.name === '_Tearsheet right panel' && child.hasCodeConnect()
      )
      .map((child) => child.executeTemplate().example);
    influencer =
      rightChildren.length > 0
        ? figma.code`${figma.helpers.react.renderChildren(rightChildren)}`
        : undefined;
  }

  const children = instance
    .findConnectedInstances(
      (child) =>
        child.name === '_Tearsheet content - Wide' && child.hasCodeConnect()
    )
    .map((child) => child.executeTemplate().example);

  return {
    id: 'Tearsheet',
    imports: ["import { Tearsheet } from '@carbon/react';"],
    example: figma.code`<Tearsheet
  open${figma.helpers.react.renderProp(
    'title',
    title
  )}${figma.helpers.react.renderProp('description', description)}${
    actionsCode ? figma.code`\n  actions=${actionsCode}` : ''
  }${
    influencer ? figma.code`\n  influencer=${influencer}` : ''
  }${figma.helpers.react.renderProp(
    'influencerPosition',
    influencerPosition
  )}${figma.helpers.react.renderProp('influencerWidth', influencerWidth)}>
  ${figma.helpers.react.renderChildren(children)}
</Tearsheet>`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
