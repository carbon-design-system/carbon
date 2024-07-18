/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  unstable__FluidSelect as FluidSelect,
  SelectItem,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FluidSelect,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17650-275243&t=LS77peWFGhwOdxIw-4',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      labelText: figma.string('Label text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error text'),
      // showtooltip: figma.boolean('Show tooltip'), // not supported in react
      // labelText: figma.boolean('Show tooltip', {
      //   true: 'add tooltip icon code here ',
      //   false: figma.string('Label text'),
      // }),
    },
    example: ({ ...props }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <FluidSelect {...props}>
        <SelectItem value="" text="" />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </FluidSelect>
    ),
  }
);
