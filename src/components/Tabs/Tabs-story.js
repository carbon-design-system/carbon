import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tabs from '../Tabs';
import Tab from '../Tab';
import TabsSkeleton from '../Tabs/Tabs.Skeleton';

const props = {
  tabs: {
    className: 'some-class',
    triggerHref: '#anotherAnchor',
  },
  tab: {
    className: 'another-class',
    onClick: action('onClick'),
    onKeyDown: action('onKeyDown'),
  },
};

storiesOf('Tabs', module)
  .addWithInfo(
    'Default',
    `
      Tabs are used to quickly navigate between views within the same context. Create individual
      Tab components for each item in the Tabs list.
    `,
    () => (
      <Tabs {...props.tabs}>
        <Tab {...props.tab} label="Tab label 1">
          <div className="some-content">Content for first tab goes here.</div>
        </Tab>
        <Tab {...props.tab} label="Tab label 2">
          <div className="some-content">Content for second tab goes here.</div>
        </Tab>
        <Tab {...props.tab} label="Tab label 3">
          <div className="some-content">Content for third tab goes here.</div>
        </Tab>
        <Tab {...props.tab} label="Tab label 4">
          <div className="some-content">Content for fourth tab goes here.</div>
        </Tab>
      </Tabs>
    )
  )
  .addWithInfo(
    'Selected Example',
    `
      By using the selected prop on the Tabs component, you can switch which Tab gets
      rendered by default
    `,
    () => (
      <Tabs {...props.tabs} selected={3}>
        <Tab {...props.tab} label="Tab label 1">
          <div className="some-content">Content for first tab goes here.</div>
        </Tab>
        <Tab {...props.tab} label="Tab label 2">
          <div className="some-content">Content for second tab goes here.</div>
        </Tab>
        <Tab {...props.tab} label="Tab label 3">
          <div className="some-content">Content for third tab goes here.</div>
        </Tab>
        <Tab {...props.tab} label="Tab label 4">
          <div className="some-content">Content for fourth tab goes here.</div>
        </Tab>
      </Tabs>
    )
  )
  .addWithInfo(
    'skeleton',
    `
      Placeholder skeleton state to use when content is loading.
    `,
    () => <TabsSkeleton />
  );
