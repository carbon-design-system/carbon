/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { FilterPanel, FilterPanelLabel } from '..';
import mdx from './FilterPanelLabel.mdx';

import styles from '../_storybook-styles.scss?inline';

const storyClass = 'filter-panel-stories';

export default {
  title: 'Internal/FilterPanelLabel',
  component: FilterPanelLabel,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    className: { control: { type: {} } },
    onChange: { table: { disable: true } },
    count: {
      control: {
        type: 'select',
        labels: {
          0: 'No value',
          1: 'As number: 10',
          2: 'As string: "1,500"',
        },
      },
      mapping: {
        0: undefined,
        1: 10,
        2: '1,500',
      },
      options: [0, 1, 2],
    },
    labelText: {
      control: {
        type: 'select',
        labels: {
          0: 'Plain text',
          1: 'Very long text',
          2: 'Using markup',
        },
      },
      mapping: {
        0: 'Label',
        1: 'Really, really long label name',
        2: (
          <>
            <strong>Formatted</strong> <em>label</em>
          </>
        ),
      },
      options: [0, 1, 2],
    },
  },
  args: {
    count: 1,
    labelText: 0,
  },
};

const Template = (args) => {
  return (
    <div className={`${storyClass}__viewport`}>
      <FilterPanel>
        <FilterPanelLabel {...args} />
      </FilterPanel>
    </div>
  );
};

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  title: '',
};
