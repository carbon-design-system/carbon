/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../index.scss';

import '../../feature-flags';
import React from 'react';
import { mount } from '@cypress/react';
import {
  default as Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabsSkeleton,
} from '../Tabs';

describe('Tabs', () => {
  beforeEach(() => {
    mount(
      <>
        <Tabs>
          <TabList>
            <Tab>Tab label 1</Tab>
            <Tab>Tab label 2</Tab>
            <Tab disabled>Tab label 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Content for first tab goes here.</p>
            </TabPanel>
            <TabPanel>
              <p>Content for second tab goes here.</p>
            </TabPanel>
            <TabPanel>
              <p>Content for third tab goes here.</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <TabsSkeleton type="default" />
        <TabsSkeleton type="container" />
      </>
    );
  });

  it('should render', () => {
    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
