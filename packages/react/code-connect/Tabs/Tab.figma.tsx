/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-nocheck
import React from 'react';
import { Tab, IconTab } from '@carbon/react';
import figma from '@figma/code-connect';

const sharedTabProps = {
  label: figma.string('Label text'),
  disabled: figma.enum('State', {
    Disabled: true,
  }),
  renderIcon: figma.instance('Swap icon'),
  secondaryLabel: figma.boolean('Show 2nd label', {
    true: figma.textContent('2nd label'),
  }),
  icon: figma.instance('Swap icon'),
};

'',
  figma.connect(
    Tab,
    'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5658-278361&t=wcK3P98b09VsrxXF-4',
    {
      variant: { Type: 'Text + Icon' },
      props: sharedTabProps,
      example: ({ label, disabled, renderIcon }) => (
        <Tab disabled={disabled} renderIcon={renderIcon}>
          {label}
        </Tab>
      ),
    }
  );

figma.connect(
  Tab,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5658-278361&t=wcK3P98b09VsrxXF-4',
  {
    variant: {
      Type: 'Text + Icon',
      Style: 'Contained',
      'Show 2nd label': 'True',
    },
    props: sharedTabProps,
    example: ({ label, disabled, renderIcon, secondaryLabel }) => (
      <Tab
        disabled={disabled}
        secondaryLabel={secondaryLabel}
        renderIcon={renderIcon}>
        {label}
      </Tab>
    ),
  }
);

figma.connect(
  IconTab,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5658-278361&t=wcK3P98b09VsrxXF-4',
  {
    variant: { Type: 'Icon only' },
    props: sharedTabProps,
    example: ({ disabled, icon, label }) => (
      <IconTab disabled={disabled} label={label}>
        {icon}
      </IconTab>
    ),
  }
);

// vertical tabs items
figma.connect(
  Tab,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=75769-1965&t=PaZ3ZnEGQGMgXgBW-4',
  {
    props: {
      label: figma.string('Text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ label, disabled }) => <Tab disabled={disabled}>{label}</Tab>,
  }
);
