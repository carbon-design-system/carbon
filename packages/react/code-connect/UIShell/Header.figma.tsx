/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  HeaderContainer,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderGlobalBar,
  SkipToContent,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Header,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=92123-1663&t=UFUf7yvv8SJyoEK1-4',
  {
    props: {
      prefix: figma.boolean('Site prefix', {
        true: figma.string('Site prefix text'),
      }),
      name: figma.string('Site name'),
      headerMenuButton: figma.boolean('Menu', {
        true: figma.children('Menu trigger'),
      }),
      headerGlobalActions: figma.boolean('Actions', {
        true: figma.children(['UI shell - Header actions']),
      }),
      HeaderMenuItems: figma.boolean('Navigation', {
        true: figma.children(['UI shell - Header menu item']),
      }),
    },
    example: ({
      headerMenuButton,
      headerGlobalActions,
      HeaderMenuItems,
      prefix,
      name,
    }) => (
      <HeaderContainer>
        <Header aria-label={name}>
          <SkipToContent />
          {headerMenuButton}
          <HeaderName href="#" prefix={prefix}>
            {name}
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            {HeaderMenuItems}
          </HeaderNavigation>
          <HeaderGlobalBar>{headerGlobalActions}</HeaderGlobalBar>
        </Header>
      </HeaderContainer>
    ),
  }
);
