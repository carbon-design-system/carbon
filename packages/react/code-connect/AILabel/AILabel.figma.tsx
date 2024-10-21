/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { AILabel } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  AILabel,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=51447-1916&t=9XaizJDx8eI6KgQz-4',
  {
    props: {
      aiText: figma.string('Text translation'),
      size: figma.enum('Size', {
        '16px': 'mini',
        '20px': '2xs',
        '24px': 'xs',
        '32px': 'sm',
        '40px': 'md',
        '48px': 'lg',
        '64px': 'xl',
      }),
    },
    example: ({ ...props }) => <AILabel autoAlign {...props} />,
  }
);

// inline
figma.connect(
  AILabel,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=51447-2035&t=9XaizJDx8eI6KgQz-4',
  {
    props: {
      aiText: figma.string('Text translation'),
      textLabel: figma.enum('Type', {
        'Text + Icon': figma.string('Slug text'),
      }),
      size: figma.enum('Size', {
        '12px': 'sm',
        '14px': 'md',
        '16px': 'lg',
      }),
    },
    example: ({ ...props }) => <AILabel autoAlign kind="inline" {...props} />,
  }
);
