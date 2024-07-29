/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { MenuItem, MenuItemSelectable, MenuItemDivider } from '@carbon/react';
import figma from '@figma/code-connect';

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
  MenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    props: sharedMenuItemProps,
    example: ({ disabled, label, kind }) => (
      <MenuItem disabled={disabled} label={label} kind={kind} />
    ),
  }
);

figma.connect(
  MenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { Divider: 'True' },
    props: sharedMenuItemProps,
    example: ({ disabled, label, kind }) => (
      <>
        <MenuItemDivider />
        <MenuItem disabled={disabled} label={label} kind={kind} />
      </>
    ),
  }
);

figma.connect(
  MenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { 'Shortcuts or Trigger ': 'True' },
    props: sharedMenuItemProps,
    example: ({ disabled, label, kind }) => (
      <MenuItem disabled={disabled} label={label} shortcut="⌘X" kind={kind} />
    ),
  }
);

figma.connect(
  MenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { 'Shortcuts or Trigger ': 'True', Divider: 'True' },
    props: sharedMenuItemProps,
    example: ({ disabled, label, kind }) => (
      <>
        <MenuItemDivider />
        <MenuItem disabled={disabled} label={label} shortcut="⌘X" kind={kind} />
      </>
    ),
  }
);

figma.connect(
  MenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { Selected: 'True' },
    props: sharedMenuItemProps,
    example: ({ disabled, label, kind }) => (
      <MenuItemSelectable
        disabled={disabled}
        label={label}
        selected
        kind={kind}
      />
    ),
  }
);

figma.connect(
  MenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=36234-38344&t=OdgMrt4NDVwZpNSx-4',
  {
    variant: { Selected: 'True', Divider: 'True' },
    props: sharedMenuItemProps,
    example: ({ disabled, label, kind }) => (
      <>
        <MenuItemDivider />
        <MenuItemSelectable
          disabled={disabled}
          label={label}
          selected
          kind={kind}
        />
      </>
    ),
  }
);
