/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { CheckboxGroup } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  CheckboxGroup,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17422-270657&t=Qm7ndWAwgu7d5Uxc-4',
  {
    props: {
      // horizontal: figma.boolean('Horizontal'), // missing in React
      // warnMessage: figma.boolean('Warning message'), // you can have a component in a warn state while hiding warning message in Figma, not supported in code
      // errorMessage: figma.boolean('Error message'), // you can have a component in a error state while hiding error message in Figma, not supported in code
      children: figma.children(['Checkbox']),
      helperText: figma.boolean('Helper message', {
        true: figma.string('Helper text'),
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      invalid: figma.enum('State', {
        Invalid: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
    },
    example: ({ children, ...props }) => (
      <CheckboxGroup legendText="Checkbox group label" {...props}>
        {children}
      </CheckboxGroup>
    ),
  }
);
