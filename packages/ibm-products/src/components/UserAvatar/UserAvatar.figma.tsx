/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Group, User } from '@carbon/react/icons';
import figma from '@figma/code-connect';
import { UserAvatar } from './UserAvatar';

const sharedProps = {
  name: figma.string('Initials text'),
  size: figma.enum('Size', {
    'Extra large': 'xl',
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  }),

  tooltipProps: figma.nestedProps('Tooltip', {
    text: figma.string('Tooltip text'),
    tooltipAlignment: figma.enum('🚫 Position', {
      Top: 'top',
      Right: 'right',
      Bottom: 'bottom',
      Left: 'left',
    }),
  }),

  bgProps: figma.nestedProps('Background', {
    color: figma.enum('Color', {
      Cyan: figma.enum('Sequence', {
        Primary: 'order-1-cyan',
        Secondary: 'order-7-cyan',
      }),
      Gray: figma.enum('Sequence', {
        Primary: 'order-2-gray',
        Secondary: 'order-8-gray',
      }),
      Green: figma.enum('Sequence', {
        Primary: 'order-3-green',
        Secondary: 'order-9-green',
      }),
      Magenta: figma.enum('Sequence', {
        Primary: 'order-4-magenta',
        Secondary: 'order-10-magenta',
      }),
      Purple: figma.enum('Sequence', {
        Primary: 'order-5-purple',
        Secondary: 'order-11-purple',
      }),
      Teal: figma.enum('Sequence', {
        Primary: 'order-6-teal',
        Secondary: 'order-12-teal',
      }),
    }),
  }),
};

const connectionURL =
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=15368-59379&t=lbewdWdJ4JB5izcw-4';

figma.connect(UserAvatar, connectionURL, {
  variant: { Type: 'Image' },
  props: sharedProps,

  example: (props) => (
    <UserAvatar
      image="/path/to/image"
      imageDescription="Alt text for image"
      tooltipAlignment={props.tooltipProps.tooltipAlignment}
      tooltipText={props.tooltipProps.text}
      size={props.size}
    />
  ),
});

figma.connect(UserAvatar, connectionURL, {
  variant: { Type: 'Initials' },
  props: sharedProps,
  example: (props) => (
    <UserAvatar
      tooltipAlignment={props.tooltipProps.tooltipAlignment}
      tooltipText={props.tooltipProps.text}
      name={props.name}
      size={props.size}
      backgroundColor={props.bgProps.color}
    />
  ),
});

figma.connect(UserAvatar, connectionURL, {
  variant: { Type: 'Single user' },
  props: sharedProps,
  example: (props) => (
    <UserAvatar
      renderIcon={User}
      tooltipAlignment={props.tooltipProps.tooltipAlignment}
      tooltipText={props.tooltipProps.text}
      name={props.name}
      size={props.size}
      backgroundColor={props.bgProps.color}
    />
  ),
});

figma.connect(UserAvatar, connectionURL, {
  variant: { Type: 'User group' },
  props: sharedProps,
  example: (props) => (
    <UserAvatar
      renderIcon={Group}
      tooltipAlignment={props.tooltipProps.tooltipAlignment}
      tooltipText={props.tooltipProps.text}
      name={props.name}
      size={props.size}
      backgroundColor={props.bgProps.color}
    />
  ),
});
