/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedMenuItemProps = {
  kind: figma.enum('State', {
    'Danger hover': 'danger',
    'Danger hover + Focus': 'danger',
  }),
  label: figma.string('Option text'),
  disabled: figma.enum('State', {
    Disabled: true,
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    props: sharedMenuItemProps,
    example: (props) =>
      html`<cds-menu-item
        disabled=${props.disabled}
        kind=${props.kind}
        label=${props.label}></cds-menu-item>`,
    imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { Divider: 'True' },
    props: sharedMenuItemProps,
    example: (props) =>
      html`<cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item
          disabled=${props.disabled}
          kind=${props.kind}
          label=${props.label}></cds-menu-item>`,
    imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { 'Shortcuts or Trigger ': 'True' },
    props: sharedMenuItemProps,
    example: (props) =>
      html`<cds-menu-item
        disabled=${props.disabled}
        kind=${props.kind}
        label=${props.label}
        shortcut="⌘X"></cds-menu-item>`,
    imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { 'Shortcuts or Trigger ': 'True', Divider: 'True' },
    props: sharedMenuItemProps,
    example: (props) =>
      html`<cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item
          disabled=${props.disabled}
          kind=${props.kind}
          label=${props.label}
          shortcut="⌘X"></cds-menu-item>`,
    imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { Selected: 'True' },
    props: sharedMenuItemProps,
    example: (props) =>
      html`<cds-menu-item-selectable
        disabled=${props.disabled}
        kind=${props.kind}
        label=${props.label}
        selected></cds-menu-item-selectable>`,
    imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { Selected: 'True', Divider: 'True' },
    props: sharedMenuItemProps,
    example: (props) =>
      html`<cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-selectable
          disabled=${props.disabled}
          kind=${props.kind}
          label=${props.label}
          selected></cds-menu-item-selectable>`,
    imports: ["import '@carbon/web-components/es/components/menu/index.js'"],
  }
);
