// url=https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=8858%3A390246
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/SidePanel/SidePanel.tsx
// component=SidePanel

/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const size = instance.getEnum('Size', {
    'X-Small (256)': 'xs',
    'Small (320)': 'sm',
    'Medium (480)': 'md',
    'Large (640)': 'lg',
    'X-Large (<75%)': 'xl',
  });

  const header = instance.findInstance('Header');
  const title =
    header.type !== 'ERROR' && header.getBoolean('Title')
      ? header.getString('Title text')
      : undefined;
  const subtitle =
    header.type !== 'ERROR' ? header.getString('Description text') : undefined;
  const labelText =
    header.type !== 'ERROR' && header.getBoolean('Eyebrow')
      ? header.getString('Eyebrow text')
      : undefined;
  const currentStep =
    header.type !== 'ERROR' && header.getBoolean('Back button') ? 1 : undefined;

  const slideOver = instance.getBoolean('Slide over');
  const slideIn = slideOver ? true : undefined;
  const placement = !slideOver ? 'right' : undefined;
  const selectorPageContent = !slideOver ? '#page-content' : undefined;

  const hasPrimaryActions = instance.getBoolean('Primary actions');
  const footer = hasPrimaryActions ? instance.findInstance('Footer') : null;
  const buttonCount =
    footer && footer.type !== 'ERROR'
      ? footer.getEnum('Buttons', {
          '1': '1',
          '2': '2',
          '3': '3',
          '1 + Ghost': '1 + Ghost',
          '2 + Ghost': '2 + Ghost',
        })
      : undefined;

  let actionsCode: ReturnType<typeof figma.code> | undefined;
  if (hasPrimaryActions && buttonCount) {
    if (buttonCount === '1') {
      actionsCode = figma.code`{[
    {
      kind: 'primary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
  ]}`;
    } else if (buttonCount === '2') {
      actionsCode = figma.code`{[
    {
      kind: 'primary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
    {
      kind: 'secondary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
  ]}`;
    } else if (buttonCount === '3') {
      actionsCode = figma.code`{[
    {
      kind: 'primary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
    {
      kind: 'secondary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
    {
      kind: 'secondary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
  ]}`;
    } else if (buttonCount === '1 + Ghost') {
      actionsCode = figma.code`{[
    {
      kind: 'primary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
    {
      kind: 'ghost',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
  ]}`;
    } else if (buttonCount === '2 + Ghost') {
      actionsCode = figma.code`{[
    {
      kind: 'primary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
    {
      kind: 'secondary',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
    {
      kind: 'ghost',
      label: 'Button',
      onClick: () => console.log('Clicked action button'),
    },
  ]}`;
    }
  }

  const hasActionToolbar =
    header.type !== 'ERROR' && header.getBoolean('Action toolbar');
  const actionToolbar = hasActionToolbar
    ? header.findInstance('Action toolbar')
    : null;
  const toolbarHasButton =
    actionToolbar && actionToolbar.type !== 'ERROR'
      ? actionToolbar.getBoolean('Button')
      : false;

  let toolbarCode: ReturnType<typeof figma.code> | undefined;
  const imports = ["import { SidePanel } from '@carbon/react';"];

  if (hasActionToolbar) {
    if (toolbarHasButton) {
      imports.push(
        "import { Add, Copy, Settings, TrashCan } from '@carbon/react/icons';"
      );
      toolbarCode = figma.code`{[
    {
      leading: true,
      label: 'Button',
      icon: (props) => <Add size={16} {...props} />,
      onClick: () => console.log('Clicked toolbar action button'),
      kind: 'primary',
    },
    {
      label: 'Copy',
      icon: (props) => <Copy size={16} {...props} />,
      onClick: () => console.log('Clicked toolbar action button'),
      hasIconOnly: true,
    },
    {
      label: 'Settings',
      icon: (props) => <Settings size={16} {...props} />,
      onClick: () => console.log('Clicked toolbar action button'),
      hasIconOnly: true,
    },
    {
      label: 'Delete',
      icon: (props) => <TrashCan size={16} {...props} />,
      onClick: () => console.log('Clicked toolbar action button'),
      hasIconOnly: true,
    },
  ]}`;
    } else {
      imports.push(
        "import { Copy, Settings, TrashCan } from '@carbon/react/icons';"
      );
      toolbarCode = figma.code`{[
    {
      label: 'Copy',
      icon: (props) => <Copy size={16} {...props} />,
      onClick: () => console.log('Clicked toolbar action button'),
      hasIconOnly: true,
    },
    {
      label: 'Settings',
      icon: (props) => <Settings size={16} {...props} />,
      onClick: () => console.log('Clicked toolbar action button'),
      hasIconOnly: true,
    },
    {
      label: 'Delete',
      icon: (props) => <TrashCan size={16} {...props} />,
      onClick: () => console.log('Clicked toolbar action button'),
      hasIconOnly: true,
    },
  ]}`;
    }
  }

  const children = instance
    .findConnectedInstances(
      (child) => child.name === 'Slot' && child.hasCodeConnect()
    )
    .map((child) => child.executeTemplate().example);

  return {
    id: 'SidePanel',
    imports,
    example: figma.code`<SidePanel
  open${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp(
    'title',
    title
  )}${figma.helpers.react.renderProp(
    'subtitle',
    subtitle
  )}${figma.helpers.react.renderProp(
    'labelText',
    labelText
  )}${figma.helpers.react.renderProp(
    'slideIn',
    slideIn
  )}${figma.helpers.react.renderProp(
    'placement',
    placement
  )}${figma.helpers.react.renderProp(
    'selectorPageContent',
    selectorPageContent
  )}${actionsCode ? figma.code`\n  actions=${actionsCode}` : ''}${
    toolbarCode ? figma.code`\n  actionToolbarButtons=${toolbarCode}` : ''
  }${figma.helpers.react.renderProp('currentStep', currentStep)}>
  ${figma.helpers.react.renderChildren(children)}
</SidePanel>`,
    metadata: { nestable: false },
  };
}

export default createTemplate();
