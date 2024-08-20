/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Toggle, ToggleSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Toggle,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',
  {
    props: {
      size: figma.enum('Size', {
        Default: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      labelText: figma.string('Label text'),
      defaultToggled: figma.boolean('Toggled'),
      labelA: figma.string('State text'),
      labelB: figma.string('State text'),
    },
    example: ({ ...props }) => <Toggle id="id" {...props} />,
  }
);

//https://github.com/figma/code-connect/issues/45
figma.connect(
  Toggle,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',

  {
    variant: { 'Toggle only': 'True' },
    props: {
      size: figma.enum('Size', {
        Default: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      defaultToggled: figma.boolean('Toggled'),
    },
    example: ({ disabled, size, readOnly, defaultToggled }) => (
      <Toggle
        id="id"
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        hideLabel
        defaultToggled={defaultToggled}
        labelA=""
        labelB=""
      />
    ),
  }
);

//https://github.com/figma/code-connect/issues/45
figma.connect(
  Toggle,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',

  {
    variant: { 'Show value': 'False' },
    props: {
      size: figma.enum('Size', {
        Default: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      defaultToggled: figma.boolean('Toggled'),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      labelText: figma.string('Label text'),
    },
    example: ({
      disabled,
      size,
      readOnly,
      defaultToggled,
      hideLabel,
      labelText,
    }) => (
      <Toggle
        id="id"
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        hideLabel={hideLabel}
        labelText={labelText}
        defaultToggled={defaultToggled}
        labelA=""
        labelB=""
      />
    ),
  }
);

figma.connect(
  ToggleSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',
  {
    variant: { State: 'Skeleton' },

    example: () => {
      return <ToggleSkeleton />;
    },
  }
);
