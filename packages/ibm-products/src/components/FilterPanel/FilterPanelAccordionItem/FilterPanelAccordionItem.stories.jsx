/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import {
  FilterPanel,
  FilterPanelAccordion,
  FilterPanelAccordionItem,
  FilterPanelCheckbox,
} from '..';
import mdx from './FilterPanelAccordionItem.mdx';
import uuidv4 from '../../../global/js/utils/uuidv4';

import styles from '../_storybook-styles.scss?inline';
import { Annotation } from '../../../../.storybook/Annotation';

const storyClass = 'filter-panel-stories';

export default {
  title: 'Deprecated/Filter panel/FilterPanelAccordionItem',
  component: FilterPanelAccordionItem,
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
    accordionItemProps: { control: { type: {} } },
    className: { control: { type: {} } },
    count: {
      control: {
        type: 'select',
        labels: {
          0: 'No value',
          1: 'As number: 12',
          2: 'As string: "1,500"',
        },
      },
      mapping: {
        0: undefined,
        1: 12,
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
        0: 'Accordion item',
        1: 'Really, really long item name',
        2: (
          <>
            <strong>Formatted</strong> <em>item</em> name
          </>
        ),
      },
      options: [0, 1, 2],
    },
    truncatedListProps: { control: { type: {} } },
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
        <FilterPanelAccordion labelText="Accordion">
          <FilterPanelAccordionItem
            {...args}
            accordionItemProps={{
              onHeadingClick: ({ isOpen, event }) => {
                action('onHeadingClick ({ isOpen, event })')(isOpen, event);
              },
            }}
          >
            {new Array(5).fill().map((item, index) => {
              return (
                <FilterPanelCheckbox
                  key={index}
                  count={10}
                  labelText={`Checkbox ${index + 1}`}
                  id={uuidv4()}
                  onChange={(event, { checked, id }) =>
                    action('onChange Checkbox (event, { checked, id })')(
                      event,
                      checked,
                      id
                    )
                  }
                />
              );
            })}
          </FilterPanelAccordionItem>
        </FilterPanelAccordion>
      </FilterPanel>
    </div>
  );
};

const TemplateMany = (args) => {
  return (
    <div className={`${storyClass}__viewport`}>
      <FilterPanel>
        <FilterPanelAccordion labelText="Accordion">
          <FilterPanelAccordionItem
            {...args}
            accordionItemProps={{
              onHeadingClick: ({ isOpen, event }) => {
                action('onHeadingClick ({ isOpen, event })')(isOpen, event);
              },
            }}
            truncatedListProps={{ expandedItemsLimit: 15 }}
          >
            {new Array(12).fill().map((item, index) => {
              return (
                <FilterPanelCheckbox
                  key={index}
                  count={10}
                  labelText={`Checkbox ${index + 1}`}
                  id={uuidv4()}
                  onChange={(event, { checked, id }) =>
                    action('onChange Checkbox (event, { checked, id })')(
                      event,
                      checked,
                      id
                    )
                  }
                />
              );
            })}
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

export const Truncated = TemplateMany.bind({});
Truncated.storyName = 'Truncated';
Truncated.args = {
  title: '',
};
