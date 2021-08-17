/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/components/tabs/_tabs.scss';

import React from 'react';
import { mount } from '@cypress/react';
import Tabs from './Tabs';
import Tab from '../Tab/Tab';
import TabsSkeleton from './Tabs.Skeleton';

describe('Tabs', () => {
  beforeEach(() => {
    mount(
      <>
        <Tabs>
          <Tab label="Tab label 1">
            <p>Content for first tab goes here.</p>
          </Tab>
          <Tab label="Tab label 2">
            <p>Content for second tab goes here.</p>
          </Tab>
          <Tab label="Tab label 3" disabled>
            <p>Content for third tab goes here.</p>
          </Tab>
          <Tab
            label="Tab label 4 shows truncation"
            title="Tab label 4 shows truncation">
            <p>Content for fourth tab goes here.</p>
          </Tab>
        </Tabs>
        <Tabs type="container">
          <Tab label="Tab label 1">
            <p>Yellow</p>
          </Tab>
          <Tab label="Tab label 2">
            <p>Content for second tab goes here.</p>
          </Tab>
          <Tab
            label="Tab label 3 shows truncation"
            title="Tab label 3 shows truncation">
            <p>Content for third tab goes here.</p>
          </Tab>
          <Tab label="Tab label 4" disabled>
            <p>Content for fourth container tab goes here.</p>
          </Tab>
        </Tabs>
        <TabsSkeleton type="default" />
        <TabsSkeleton type="container" />
      </>
    );
  });

  it('should render', () => {
    cy.findByText('Yellow').should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});
