/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import uuidv4 from '../../../global/js/utils/uuidv4';

import { OverflowMenuItem } from '@carbon/react';
import { FilterPanel } from '..';
import { FilterPanelCheckboxWithOverflow } from '.';
import mdx from './FilterPanelCheckboxWithOverflow.mdx';

import styles from '../_storybook-styles.scss?inline';
import { Annotation } from '../../../../.storybook/Annotation';

const storyClass = 'filter-panel-stories';

export default {
  title: 'Deprecated/Filter panel/FilterPanelCheckboxWithOverflow',
  component: FilterPanelCheckboxWithOverflow,
  tags: ['autodocs'],
  argTypes: {
    children: { control: { type: {} } },
    className: { control: { type: {} } },
    id: { table: { disable: true } },
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
        0: 'Checkbox',
        1: 'Really, really long checkbox name',
        2: (
          <>
            <strong>Formatted</strong> <em>checkbox</em>
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
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
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
      <FilterPanel>
        <FilterPanelCheckboxWithOverflow {...args}>
          <OverflowMenuItem
            itemText="Option 1"
            onClick={(event) => {
              action('onClick (event)')(event);
            }}
          />
          <OverflowMenuItem
            itemText="Option 2, preselected"
            onClick={(event) => {
              action('onClick (event)')(event);
            }}
            data-storybook-example-primary-focus
          />
          <OverflowMenuItem
            itemText="Option 3"
            onClick={(event) => {
              action('onClick (event)')(event);
            }}
          />
          <OverflowMenuItem
            itemText="Option 4"
            onClick={(event) => {
              action('onClick (event)')(event);
            }}
          />
        </FilterPanelCheckboxWithOverflow>
      </FilterPanel>
    </div>
  );
};

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  id: uuidv4(),
  // Pass-through prop: Carbon's Checkbox onChange handler.
  onChange: (event, { checked, id }) =>
    action('onChange Checkbox (event, { checked, id })')(event, checked, id),
  overflowMenuProps: {
    selectorPrimaryFocus: '[data-storybook-example-primary-focus]',
  },
  title: '',
};
