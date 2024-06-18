/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Link } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Link,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=50111-991&mode=design&t=kyFCPK0tCeufcNP2-4',
  {
    props: {
      inline: figma.boolean('Inline'),
      linkText: figma.string('Link text'),
      renderIcon: figma.instance('Swap icon'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ size, disabled, inline, renderIcon, linkText }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <Link
        inline={inline}
        disabled={disabled}
        renderIcon={renderIcon}
        size={size}
        href="#">
        {linkText}
      </Link>
    ),
  }
);
