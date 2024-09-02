/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Switch } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Switch,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=10151-402337&t=Y6lD1uj5Q0yszbgL-4',
  {
    props: {
      text: figma.string('Label text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ text, disabled }) => <Switch disabled={disabled} text={text} />,
  }
);
