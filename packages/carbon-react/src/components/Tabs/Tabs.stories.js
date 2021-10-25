/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, Tab, Tabs, TabsSkeleton } from '../Tabs';
import { unstable_FeatureFlags as FeatureFlags } from 'carbon-components-react';
import { Layer } from '../Layer';

export default {
  title: 'Components/Tabs',
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
  parameters: {
    component: Tabs,
    subcomponents: {
      Tab,
      TabsSkeleton,
    },
  },
};

export const Default = () => (
  <Tabs>
    <Tab id="tab-1" label="Tab label 1">
      <p>Content for first tab goes here.</p>
    </Tab>
    <Tab id="tab-2" label="Tab label 2">
      <p>Content for second tab goes here.</p>
      <Button>With a button</Button>
    </Tab>
    <Tab id="tab-3" label="Tab label 3" disabled>
      <p>Content for third tab goes here.</p>
    </Tab>
    <Tab
      id="tab-4"
      label="Tab label 4 shows truncation"
      title="Tab label 4 shows truncation">
      <p>Content for fourth tab goes here.</p>
    </Tab>
    <Tab label={<div>Custom Label</div>}>
      <p>Content for fifth tab goes here.</p>
    </Tab>
  </Tabs>
);

export const withLayer = () => {
  return (
    <>
      <Tabs>
        <Tab id="tab-1" label="Tab label 1">
          <p>First Layer. Content for first tab goes here.</p>
        </Tab>
        <Tab id="tab-2" label="Tab label 2">
          <p>Content for second tab goes here.</p>
          <Button>With a button</Button>
        </Tab>
        <Tab id="tab-3" label="Tab label 3" disabled>
          <p>Content for third tab goes here.</p>
        </Tab>
        <Tab
          id="tab-4"
          label="Tab label 4 shows truncation"
          title="Tab label 4 shows truncation">
          <p>Content for fourth tab goes here.</p>
        </Tab>
        <Tab label={<div>Custom Label</div>}>
          <p>Content for fifth tab goes here.</p>
        </Tab>
      </Tabs>
      <Layer>
        <Tabs>
          <Tab id="tab-1" label="Tab label 1">
            <p>Second Layer. Content for first tab goes here.</p>
          </Tab>
          <Tab id="tab-2" label="Tab label 2">
            <p>Content for second tab goes here.</p>
            <Button>With a button</Button>
          </Tab>
          <Tab id="tab-3" label="Tab label 3" disabled>
            <p>Content for third tab goes here.</p>
          </Tab>
          <Tab
            id="tab-4"
            label="Tab label 4 shows truncation"
            title="Tab label 4 shows truncation">
            <p>Content for fourth tab goes here.</p>
          </Tab>
          <Tab label={<div>Custom Label</div>}>
            <p>Content for fifth tab goes here.</p>
          </Tab>
        </Tabs>
        <Layer>
          <Tabs>
            <Tab id="tab-1" label="Tab label 1">
              <p>Third Layer. Content for first tab goes here.</p>
            </Tab>
            <Tab id="tab-2" label="Tab label 2">
              <p>Content for second tab goes here.</p>
              <Button>With a button</Button>
            </Tab>
            <Tab id="tab-3" label="Tab label 3" disabled>
              <p>Content for third tab goes here.</p>
            </Tab>
            <Tab
              id="tab-4"
              label="Tab label 4 shows truncation"
              title="Tab label 4 shows truncation">
              <p>Content for fourth tab goes here.</p>
            </Tab>
            <Tab label={<div>Custom Label</div>}>
              <p>Content for fifth tab goes here.</p>
            </Tab>
          </Tabs>
        </Layer>
      </Layer>
    </>
  );
};
