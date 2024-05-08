/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tab, IconTab } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Tab,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=5658-278361&mode=design&t=ERtuwFdbSumlRYtB-4',
  {
    props: {
      label: figma.string('Label text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      renderIcon: figma.instance('Swap icon'),
      // secondaryLabel: doesn't exist in Figma
    },
    example: ({ label, disabled, renderIcon }) => (
      <Tab disabled={disabled} renderIcon={renderIcon}>
        {label}
      </Tab>
    ),
  }
);

figma.connect(
  IconTab,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=5658-278361&mode=design&t=ERtuwFdbSumlRYtB-4',
  {
    variant: { Type: 'Icon only' },
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      icon: figma.instance('Swap icon'),
    },
    example: ({ disabled, icon }) => (
      <IconTab disabled={disabled}>{icon}</IconTab>
    ),
  }
);
