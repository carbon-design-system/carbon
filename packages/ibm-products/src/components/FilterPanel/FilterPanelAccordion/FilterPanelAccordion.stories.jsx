/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { FilterPanel, FilterPanelAccordionItem, FilterPanelCheckbox } from '..';
import { FilterPanelAccordion } from '.';
import mdx from './FilterPanelAccordion.mdx';
import uuidv4 from '../../../global/js/utils/uuidv4';

import styles from '../_storybook-styles.scss?inline';
import { Annotation } from '../../../../.storybook/Annotation';

const storyClass = 'filter-panel-stories';

export default {
  title: 'Deprecated/Filter panel/FilterPanelAccordion',
  component: FilterPanelAccordion,
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
        0: 'Accordion name',
        1: 'Really, really long accordion name',
        2: (
          <>
            Formatted{' '}
            <span style={{ fontWeight: 'normal' }}>
              <em>accordion</em> label
            </span>
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
        <FilterPanelAccordion {...args}>
          <FilterPanelAccordionItem
            labelText="Accordion item"
            count={10}
            accordionItemProps={{
              onHeadingClick: ({ isOpen, event }) => {
                action('onHeadingClick ({ isOpen, event })')(isOpen, event);
              },
            }}
          >
            <FilterPanelCheckbox
              count={10}
              labelText="Checkbox"
              // "id" and "onChange" are pass-through props to Carbon's Checkbox.
              id={uuidv4()}
              onChange={(event, { checked, id }) =>
                action('onChange Checkbox (event, { checked, id })')(
                  event,
                  checked,
                  id
                )
              }
            />
          </FilterPanelAccordionItem>
        </FilterPanelAccordion>
      </FilterPanel>
    </div>
  );
};

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  title: '',
};
