/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { OverflowMenuItem } from '@carbon/react';
import { getNodeTextContent } from '../../global/js/utils/getNodeTextContent';

import uuidv4 from '../../global/js/utils/uuidv4';

import {
  FilterPanel,
  FilterPanelAccordion,
  FilterPanelAccordionItem,
  FilterPanelCheckbox,
  FilterPanelCheckboxWithOverflow,
  FilterPanelGroup,
  FilterPanelSearch,
} from '.';
import mdx from './FilterPanel.mdx';

import styles from './_storybook-styles.scss?inline';
import { Annotation } from '../../../.storybook/Annotation';

const storyClass = 'filter-panel-stories';

export default {
  title: 'Deprecated/Filter panel/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    children: { control: { type: {} } },
    className: { control: { type: {} } },
    title: {
      control: {
        type: 'select',
        labels: {
          0: 'No title',
          1: 'Plain text',
          2: 'Using markup',
        },
      },
      mapping: {
        0: null,
        1: 'Filter panel title',
        2: (
          <>
            <strong>Filter</strong> <em>panel</em> title
          </>
        ),
      },
      options: [0, 1, 2],
    },
  },
  args: {
    title: 1,
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

const demoData = [
  { label: 'Checkbox', count: 6 },
  {
    label: (
      <>
        <strong>Formatted</strong> <em>checkbox</em>
      </>
    ),
    count: '1,500',
  },
  { label: 'Really, really long checkbox name', count: 10 },
  { label: 'Checkbox with menu 1', count: 6 },
  { label: 'Checkbox with menu 2', count: 6 },
  { label: 'Checkbox 1', count: 10 },
  { label: 'Checkbox 2', count: 10 },
  { label: 'Checkbox 3', count: 15 },
];

const getDemoSearchResults = (data, searchValue) => {
  let demoSearchResults;
  let filteredData = [];

  if (searchValue.length > 0) {
    filteredData = data.filter((item) => {
      const t = getNodeTextContent(item.label).toLowerCase();
      const s = searchValue.toLowerCase();
      return t.indexOf(s) > -1;
    });
  }

  if (searchValue.length > 0 && filteredData.length === 0) {
    demoSearchResults = <p>No search results found.</p>;
  } else if (searchValue.length > 0 && filteredData.length > 0) {
    demoSearchResults = filteredData.map((item, index) => {
      return (
        <FilterPanelCheckbox
          key={index}
          labelText={item.label}
          count={item.count}
          id={uuidv4()}
        />
      );
    });
  }

  return demoSearchResults;
};

const Template = (args) => {
  const [searchValue, setSearchValue] = useState('');
  const demoSearchResults = getDemoSearchResults(demoData, searchValue);

  return (
    <div className={`${storyClass}__viewport`}>
      <FilterPanel {...args}>
        <FilterPanelSearch
          searchProps={{
            labelText: 'Search',
            onChange: (event) => {
              action('onChange "' + event.target.value + '"')(event);
              setSearchValue(event.target.value);
            },
            onClear: () => {
              action()('onClear');
            },
          }}
        >
          {demoSearchResults}
        </FilterPanelSearch>
        <FilterPanelGroup labelText="Group">
          <FilterPanelCheckbox
            count={6}
            defaultChecked
            labelText="Checkbox"
            // "id" and "onChange" are pass-through props to Carbon's Checkbox.
            id={uuidv4()}
            onChange={(event, { checked, id }) =>
              action('onChange Checkbox')(checked, id, event)
            }
          />
          <FilterPanelCheckbox
            count={'1,500'}
            defaultChecked
            labelText={
              <>
                <strong>Formatted</strong> <em>checkbox</em>
              </>
            }
            id={uuidv4()}
            onChange={(event, { checked, id }) =>
              action('onChange Checkbox')(checked, id, event)
            }
          />
          <FilterPanelCheckbox
            count={10}
            defaultChecked
            labelText="Really, really long checkbox name"
            id={uuidv4()}
            onChange={(event, { checked, id }) =>
              action('onChange Checkbox')(checked, id, event)
            }
          />
        </FilterPanelGroup>
        <FilterPanelGroup labelText="Group" count={'6'}>
          <FilterPanelCheckboxWithOverflow
            {...args}
            count={6}
            id={uuidv4()}
            labelText="Checkbox with menu 1"
            onChange={(event, { checked, id }) =>
              action('onChange Checkbox')(checked, id, event)
            }
          >
            <OverflowMenuItem
              itemText="Option 1"
              onClick={(event) => {
                action('onClick (event)')(event);
              }}
            />
            <OverflowMenuItem
              itemText="Option 2"
              onClick={(event) => {
                action('onClick (event)')(event);
              }}
            />
          </FilterPanelCheckboxWithOverflow>
          <FilterPanelCheckboxWithOverflow
            {...args}
            count={6}
            id={uuidv4()}
            labelText="Checkbox with menu 2"
            onChange={(event, { checked, id }) =>
              action('onChange Checkbox')(checked, id, event)
            }
            overflowMenuProps={{
              selectorPrimaryFocus: '[data-storybook-example-primary-focus]',
            }}
          >
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
        </FilterPanelGroup>
        <FilterPanelAccordion labelText="Accordion" count={35}>
          <FilterPanelAccordionItem
            labelText="Accordion item"
            count={35}
            accordionItemProps={{
              onHeadingClick: ({ isOpen, event }) => {
                action('onHeadingClick ({ isOpen, event })')(isOpen, event);
              },
            }}
          >
            <FilterPanelCheckbox
              count={10}
              labelText="Checkbox 1"
              id={uuidv4()}
              onChange={(event, { checked, id }) =>
                action('onChange Checkbox (event, { checked, id })')(
                  event,
                  checked,
                  id
                )
              }
            />
            <FilterPanelCheckbox
              count={10}
              labelText="Checkbox 2"
              id={uuidv4()}
              onChange={(event, { checked, id }) =>
                action('onChange Checkbox (event, { checked, id })')(
                  event,
                  checked,
                  id
                )
              }
            />
            <FilterPanelCheckbox
              count={15}
              labelText="Checkbox 3"
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
