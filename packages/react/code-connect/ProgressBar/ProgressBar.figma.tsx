/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ProgressBar } from '@carbon/react';
import figma from '@figma/code-connect';

const sharedProgressBarProps = {
  label: figma.string('Label text'),
  value: figma.enum('Progress', {
    '0%': 0,
    '25%': 25,
    '50%': 50,
    '75%': 75,
  }),
  type: figma.enum('Alignment', {
    Inline: 'inline',
    Indent: 'indent',
  }),
  status: figma.enum('State', {
    Active: 'active',
    Success: 'finished',
    Error: 'error',
  }),
  size: figma.enum('Size', {
    Big: 'big',
    Small: 'small',
  }),
  helperText: figma.string('Helper text'),
  helperTextError: figma.string('Error text'),
  helperTextSuccess: figma.string('Success text'),
};

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9506-402924&t=j280IIQF1o3iLkV2-4',
  {
    props: sharedProgressBarProps,
    example: ({ label, value, helperText, status, type, size }) => (
      <ProgressBar
        label={label}
        value={value}
        helperText={helperText}
        status={status}
        type={type}
        size={size}
      />
    ),
  }
);

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9506-402924&t=j280IIQF1o3iLkV2-4',
  {
    variant: { State: 'Error' },
    props: sharedProgressBarProps,
    example: ({ label, value, status, type, size, helperTextError }) => (
      <ProgressBar
        label={label}
        value={value}
        helperText={helperTextError}
        status={status}
        type={type}
        size={size}
      />
    ),
  }
);

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9506-402924&t=j280IIQF1o3iLkV2-4',
  {
    variant: { State: 'Success' },
    props: sharedProgressBarProps,
    example: ({ label, value, status, type, size, helperTextSuccess }) => (
      <ProgressBar
        label={label}
        value={value}
        helperText={helperTextSuccess}
        status={status}
        type={type}
        size={size}
      />
    ),
  }
);
