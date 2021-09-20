/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  ContentSwitcher,
  ContentTabs,
  ContentTab,
  ContentPanels,
  ContentPanel,
} from './';

export default {
  title: 'Experimental/unstable_ContentSwitcher',
  includeStories: [],
};

export const Default = () => {
  return (
    <ContentSwitcher>
      <ContentTabs activation="manual" aria-label="Example content switcher">
        <ContentTab>Tab 1</ContentTab>
        <ContentTab>Tab 2</ContentTab>
        <ContentTab>Tab 3</ContentTab>
      </ContentTabs>
      <ContentPanels>
        <ContentPanel>Panel 1</ContentPanel>
        <ContentPanel>Panel 2</ContentPanel>
        <ContentPanel>Panel 3</ContentPanel>
      </ContentPanels>
    </ContentSwitcher>
  );
};
