/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-nocheck
import React from 'react';
import { Button, ButtonSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Button,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=1854-1776&mode=dev',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      buttonText: figma.string('Button text'),
      kind: figma.enum('Style', {
        Primary: 'primary',
        Secondary: 'secondary',
        Tertiary: 'tertiary',
        Ghost: 'ghost',
        'Danger primary': 'danger',
        'Danger tertiary': 'danger--tertiary',
        'Danger ghost': 'danger--ghost',
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra large': 'xl',
        '2x large': '2xl',
      }),
      isExpressive: figma.enum('Size', {
        Expressive: true,
      }),
      hasIconOnly: figma.enum('Type', {
        'Icon only': true,
      }),
      renderIcon: figma.instance('Swap icon'),
    },
    example: ({ ...props, buttonText }) => {
      return <Button {...props}>{buttonText}</Button>;
    },
  }
);

figma.connect(
  ButtonSkeleton,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=1854-1776&mode=dev',
  {
    variant: { State: 'Skeleton' },
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra large': 'xl',
        '2x large': '2xl',
      }),
    },
    example: ({ size }) => {
      return <ButtonSkeleton size={size} />;
    },
  }
);
