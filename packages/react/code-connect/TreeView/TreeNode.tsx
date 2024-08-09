/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { TreeNode } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  TreeNode,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11828-285325&t=aG4cJRjteQHcd71k-4',
  {
    props: {
      renderIcon: figma.boolean('Icon', {
        true: <AddActualIconName />,
      }),
      label: figma.string('Node text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      selected: figma.boolean('Selected'),
      isExpanded: figma.boolean('Open'),
    },
    example: ({ ...props }) => <TreeNode {...props} />,
  }
);
