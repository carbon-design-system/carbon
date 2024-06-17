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

figma.connect(
  Tab,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=5658-278361&mode=design&t=ERtuwFdbSumlRYtB-4',
  {
    variant: { Type: 'Text + Icon' },
    props: {
      label: figma.string('Label text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      renderIcon: figma.instance('Swap icon'),
      secondaryLabel: figma.boolean('Show 2nd label', {
        true: 'Manually add secondary label', // exists as a text node  - on Figma roadmap https://github.com/figma/code-connect/issues/30
        false: undefined,
      }),
    },
    example: ({ label, disabled, renderIcon, secondaryLabel }) => (
      <Tab
        disabled={disabled}
        renderIcon={renderIcon}
        secondaryLabel={secondaryLabel}>
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
      label: figma.string('Label text'),
      // iconSize: figma.enum('Size', { //  needs to be set on parent TabList component
      //   Large: 'lg',
      //   Medium: undefined,
      // }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      icon: figma.instance('Swap icon'),
    },
    example: ({ disabled, icon, label }) => (
      <IconTab disabled={disabled} label={label}>
        {icon}
      </IconTab>
    ),
  }
);
