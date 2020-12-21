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
import Tabs from '../Tabs';
import Tab from '../Tab';
import TextInput from '../TextInput';
import TabsSkeleton from '../Tabs/Tabs.Skeleton';
import mdx from './Tabs.mdx';

const selectionModes = {
  'Change selection automatically upon focus (automatic)': 'automatic',
  'Change selection on explicit gesture (manual)': 'manual',
};

const { prefix } = settings;
const props = {
  tabs: () => ({
    className: 'some-class',
    light: boolean('Light variant (light)', false),
    selected: number('The index of the selected tab (selected in <Tabs>)', 1),
    // Disabling action logger for `<Tabs onClick onKeyDown>` for now given it seems to be significantly slowing down Storybook
    // onClick: action('onClick'),
    // onKeyDown: action('onKeyDown'),
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
  title: 'Tabs',
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

export const Default = () => (
  <div className={props.tabs().light ? 'tabs-story-wrapper--light' : null}>
    <Tabs {...props.tabs()}>
      <Tab id="tab-1" {...props.tab()} label="Tab label 1">
        <div className="some-content">
          <p>Content for first tab goes here.</p>
        </div>
      </Tab>
      <Tab id="tab-2" {...props.tab()} label="Tab label 2">
        <div className="some-content">
          <p>Content for second tab goes here.</p>
        </div>
      </Tab>
      <Tab id="tab-3" {...props.tab()} label="Tab label 3" disabled>
        <div className="some-content">
          <p>Content for third tab goes here.</p>
        </div>
      </Tab>
      <Tab
        id="tab-4"
        {...props.tab()}
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
      <Tab
        id="tab-5"
        {...props.tab()}
        label={<CustomLabel text="Custom Label" />}>
        <div className="some-content">
          <p>Content for fifth tab goes here.</p>
        </div>
      </Tab>
    </Tabs>
  </div>
);

Default.parameters = {
  info: {
    text: `
        Tabs are used to quickly navigate between views within the same context. Create individual
        Tab components for each item in the Tabs list.
      `,
  },
};

export const Container = () => (
  <div
    className={
      props.tabs().light ? 'container-tabs-story-wrapper--light' : null
    }>
    <Tabs type="container" {...props.tabs()}>
      <Tab id="tab-1" {...props.tab()} label="Tab label 1">
        <div className="some-content">
          <p>Content for first tab goes here.</p>
        </div>
      </Tab>
      <Tab id="tab-2" {...props.tab()} label="Tab label 2">
        <div className="some-content">
          <p>Content for second tab goes here.</p>
        </div>
      </Tab>
      <Tab
        id="tab-3"
        {...props.tab()}
        label="Tab label 3 renders content only when selected"
        title="Tab label 3 renders content only when selected"
        renderContent={TabContentRenderedOnlyWhenSelected}>
        <div className="some-content">
          <p>Content for third tab goes here.</p>
          <p>
            This example uses the&nbsp;
            <CodeSnippet type="inline">renderContent</CodeSnippet> prop to
            re-render content when the tab is selected.
          </p>
          <CodeSnippetExample />
        </div>
      </Tab>
      <Tab
        id="tab-4"
        {...props.tab()}
        label={<CustomLabel text="Custom Label" />}>
        <div className="some-content">
          <p>Content for fourth tab goes here.</p>
          <TextInput light id="sample-input" labelText="Text Input Label" />
        </div>
      </Tab>
    </Tabs>
  </div>
);

Container.parameters = {
  info: {
    text: `
        Tabs are used to quickly navigate between views within the same context. Create individual
        Tab components for each item in the Tabs list.
      `,
  },
};

export const Skeleton = () => <TabsSkeleton />;
Skeleton.storyName = 'skeleton';
Skeleton.parameters = {
  info: {
    text: `
            Placeholder skeleton state to use when content is loading.
          `,
  },
};
