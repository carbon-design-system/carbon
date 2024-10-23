/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { unstable__FluidTextArea as FluidTextArea } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FluidTextArea,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=18791-274643&t=4Ath5JqwaYJZxznq-4',
  {
    props: {
      value: figma.boolean('Text filled', {
        true: figma.string('Body text'),
      }),
      labelText: figma.string('Label text'),
      warnText: figma.string('Warning message'),
      invalidText: figma.string('Error message'),
      placeholdertext: figma.string('Placeholder text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': 'read-only',
      }),
    },
    example: ({ ...props }) => <FluidTextArea {...props} />,
  }
);
