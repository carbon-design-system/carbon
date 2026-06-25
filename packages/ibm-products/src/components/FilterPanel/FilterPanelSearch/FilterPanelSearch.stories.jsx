/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { FilterPanelSearch } from '.';
import mdx from './FilterPanelSearch.mdx';

import styles from '../_storybook-styles.scss?inline';
import { Annotation } from '../../../../.storybook/Annotation';

const storyClass = 'filter-panel-stories';

export default {
  title: 'Deprecated/Filter panel/FilterPanelSearch',
  component: FilterPanelSearch,
  tags: ['autodocs'],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    className: { control: { type: {} } },
  },
  decorators: [
    (story) => (
      <Annotation
        type="deprecation-notice"
        text={
          <div>
            This component is deprecated and will be removed in the next major
            version.
          </div>
        }
      >
        {story()}
      </Annotation>
    ),
  ],
};

const Template = (args) => {
  return (
    <div className={`${storyClass}__viewport`}>
      <FilterPanelSearch
        {...args}
        searchProps={{
          labelText: 'Search',
          placeholder: 'Search',
          onChange: (event) => {
            action('onChange "' + event.target.value + '"')(event);
          },
          onClear: () => {
            action()('onClear');
          },
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {};
