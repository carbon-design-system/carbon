// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=92123-1663&t=UFUf7yvv8SJyoEK1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/Header.tsx
// component=Header

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const getChildren = (layer: string) =>
  instance
    .findConnectedInstances(
      (child) => child.name === layer && child.hasCodeConnect()
    )
    .map((child) => child.executeTemplate().example);
const name = instance.getString('Site name');
const prefix = instance.getBoolean('Site prefix')
  ? instance.getString('Site prefix text')
  : undefined;
const headerMenuButton = instance.getBoolean('Menu')
  ? getChildren('Menu trigger')
  : [];
const headerMenuItems = instance.getBoolean('Navigation')
  ? getChildren('UI shell - Header menu item')
  : [];
const headerGlobalActions = instance.getBoolean('Actions')
  ? getChildren('UI shell - Header actions')
  : [];

export default {
  id: 'Header',
  imports: [
    "import { HeaderContainer, Header, HeaderName, HeaderNavigation, HeaderGlobalBar, SkipToContent } from '@carbon/react';",
  ],
  example: figma.code`<HeaderContainer>
  <Header${figma.helpers.react.renderProp('aria-label', name)}>
    <SkipToContent />
    ${figma.helpers.react.renderChildren(headerMenuButton)}
    <HeaderName href="#"${figma.helpers.react.renderProp(
      'prefix',
      prefix
    )}>${figma.helpers.react.renderChildren(name)}</HeaderName>
    <HeaderNavigation aria-label="IBM [Platform]">
      ${figma.helpers.react.renderChildren(headerMenuItems)}
    </HeaderNavigation>
    <HeaderGlobalBar>${figma.helpers.react.renderChildren(
      headerGlobalActions
    )}</HeaderGlobalBar>
  </Header>
</HeaderContainer>`,
  metadata: { nestable: false },
};
