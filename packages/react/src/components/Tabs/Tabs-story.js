/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import './Tabs-story.scss';
import CodeSnippet from '../CodeSnippet';
import Button from '../Button';
import Tabs from '../Tabs';
import Tab from '../Tab';
import TabsSkeleton from '../Tabs/Tabs.Skeleton';
import mdx from './Tabs.mdx';

const selectionModes = {
  'Change selection automatically upon focus (automatic)': 'automatic',
  'Change selection on explicit gesture (manual)': 'manual',
};

const types = {
  Default: 'default',
  Container: 'container',
};

const { prefix } = settings;
const props = {
  tabs: () => ({
    type: select('Type of Tabs (type)', types, 'default'),
    className: 'some-class',
    light: boolean('Light variant (light)', false),
    selected: number('The index of the selected tab (selected in <Tabs>)', 1),
    onSelectionChange: action('onSelectionChange'),
    tabContentClassName: text(
      'The className for the child `<TabContent>` components',
      'tab-content'
    ),
    scrollIntoView: boolean(
      'Scroll to selected tab on component rerender (scrollIntoView)',
      true
    ),
    selectionMode: select(
      'Selection mode (selectionMode)',
      selectionModes,
      'automatic'
    ),
  }),
  tab: () => ({
    disabled: boolean('Disabled (disabled in <Tab>)', false),
    onClick: action('onClick'),
    onKeyDown: action('onKeyDown'),
  }),
};

const CustomLabel = ({ text }) => text;

const CodeSnippetExample = () => (
  <CodeSnippet type="multi">
    {`@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);
  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}
$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`}
  </CodeSnippet>
);

const TabContentRenderedOnlyWhenSelected = ({
  selected,
  children,
  className,
  ...other
}) =>
  !selected ? (
    <div {...other} className={`${prefix}--visually-hidden`} />
  ) : (
    <div
      {...other}
      className={classNames(className, `${prefix}--tab-content`)}
      role="tabpanel"
      selected={selected}>
      {children}
    </div>
  );

export default {
  title: 'Components/Tabs',
  decorators: [withKnobs],
  parameters: {
    component: Tabs,
    docs: {
      page: mdx,
    },
    subcomponents: {
      Tab,
      TabsSkeleton,
    },
  },
};

export const _Default = () => (
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

_Default.story = {
  name: 'Tabs',
};

export const Playground = () => (
  <div className={props.tabs().light ? 'tabs-story-wrapper--light' : null}>
    <Tabs {...props.tabs()}>
      <Tab {...props.tab()} id="tab-1" label="Tab label 1">
        <div className="some-content">
          <p>Content for first tab goes here.</p>
        </div>
      </Tab>
      <Tab {...props.tab()} id="tab-2" label="Tab label 2">
        <div className="some-content">
          <p>Content for second tab goes here.</p>
        </div>
      </Tab>
      <Tab {...props.tab()} id="tab-3" label="Tab label 3" disabled>
        <div className="some-content">
          <p>Content for third tab goes here.</p>
        </div>
      </Tab>
      <Tab
        {...props.tab()}
        id="tab-4"
        label="Tab label 4 shows truncation"
        title="Tab label 4 shows truncation"
        renderContent={TabContentRenderedOnlyWhenSelected}>
        <div className="some-content">
          <p>Content for fourth tab goes here.</p>
          <p>
            This example uses the&nbsp;
            <CodeSnippet type="inline">renderContent</CodeSnippet> prop to
            re-render content when the tab is selected.
          </p>
          <CodeSnippetExample />
        </div>
      </Tab>
      <Tab {...props.tab()} label={<CustomLabel text="Custom Label" />}>
        <div className="some-content">
          <p>Content for fifth tab goes here.</p>
        </div>
      </Tab>
    </Tabs>
  </div>
);

export const Container = () => (
  <Tabs type="container">
    <Tab id="tab-1" label="Tab label 1">
      <p>Content for first tab goes here.</p>
    </Tab>
    <Tab id="tab-2" label="Tab label 2">
      <p>Content for second tab goes here.</p>
    </Tab>
    <Tab
      id="tab-3"
      label="Tab label 3 shows truncation"
      title="Tab label 3 shows truncation">
      <p>Content for third tab goes here.</p>
    </Tab>
    <Tab label={<div>Custom Label</div>}>
      <p>Content for fourth tab goes here.</p>
    </Tab>
  </Tabs>
);

export const Skeleton = () => {
  const isLoading = boolean('isLoading', true);

  return (
    <div style={{ maxWidth: '100%' }}>
      {isLoading ? (
        <TabsSkeleton type={select('Type of Tabs (type)', types, 'default')} />
      ) : (
        <Tabs type={select('Type of Tabs (type)', types, 'default')}>
          <Tab id="tab-1" label="Tab label 1">
            <p>Content for first tab goes here.</p>
          </Tab>
          <Tab id="tab-2" label="Tab label 2">
            <p>Content for second tab goes here.</p>
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
      )}
    </div>
  );
};
