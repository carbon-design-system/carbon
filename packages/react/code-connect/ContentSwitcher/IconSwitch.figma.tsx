/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { IconSwitch } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  IconSwitch,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=21988-280553&t=Y6lD1uj5Q0yszbgL-4',
  {
    props: {
      children: figma.children('*'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ disabled, children }) => (
      <IconSwitch disabled={disabled}>{children}</IconSwitch>
    ),
  }
);
