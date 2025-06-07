/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React, { Children } from 'react';
import { SideNav, SideNavItems, SideNavMenu } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  SideNav,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=6227-297201&t=wcK3P98b09VsrxXF-4',
  {
    props: {
      expanded: figma.boolean('Compact', {
        true: false,
        false: true,
      }),
      children: figma.children(['UI shell - Left panel menu item']),
    },
    example: ({ children, expanded }) => (
      <SideNav
        aria-label="Side navigation"
        expanded={expanded}
        onSideNavBlur={() => {}}
        href="#main-content">
        <SideNavItems>
          <SideNavMenu>{children}</SideNavMenu>
        </SideNavItems>
      </SideNav>
    ),
  }
);
