/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select,
  text,
  object,
} from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import MultiSelect from '../MultiSelect';
import FilterableMultiSelect from '../MultiSelect/FilterableMultiSelect';
import Checkbox from '../Checkbox';
import mdx from './MultiSelect.mdx';

const items = [
  {
    id: 'downshift-1-item-0',
    text: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'downshift-1-item-3',
    text: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    text:
      'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'downshift-1-item-5',
    text: 'Option 5',
  },
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const directions = {
  'Bottom (default)': 'bottom',
  'Top ': 'top',
};

const props = () => ({
  id: text('MultiSelect ID (id)', 'carbon-multiselect-example'),
  titleText: text('Title (titleText)', 'Multiselect title'),
  hideLabel: boolean('No title text shown (hideLabel)', false),
  helperText: text('Helper text (helperText)', 'This is helper text'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  useTitleInItem: boolean('Show tooltip on hover', false),
  type: select('UI type (Only for `<MultiSelect>`) (type)', types, 'default'),
  size: select('Field size (size)', sizes, undefined) || undefined,
  direction: select('Dropdown direction (direction)', directions, 'bottom'),
  label: text('Label (label)', defaultLabel),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'Invalid Selection'
  ),
  warn: boolean('Show warning state (warn)', false),
  warnText: text(
    'Warning state text (warnText)',
    'Selecting more items may increase processing time'
  ),
  onChange: action('onChange'),
  onMenuChange: action('onMenuChange'),
  listBoxMenuIconTranslationIds: object(
    'Listbox menu icon translation IDs (for translateWithId callback)',
    {
      'close.menu': 'Close menu',
      'open.menu': 'Open menu',
      'clear.all': 'Clear all',
      'clear.selection': 'Clear selection',
    }
  ),
  selectionFeedback: select(
    'Selection feedback',
    ['top', 'fixed', 'top-after-reopen'],
    'top-after-reopen'
  ),
});

export default {
  title: 'Components/MultiSelect',
  decorators: [withKnobs],

  parameters: {
    component: MultiSelect,
    docs: {
      page: mdx,
    },
    subcomponents: {
      FilterableMultiSelect,
    },
  },
};

export const Default = withReadme(readme, () => {
  const {
    listBoxMenuIconTranslationIds,
    selectionFeedback,
    ...multiSelectProps
  } = props();
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        {...multiSelectProps}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        translateWithId={(id) => listBoxMenuIconTranslationIds[id]}
        selectionFeedback={selectionFeedback}
      />
    </div>
  );
});

export const ItemToElement = withReadme(readme, () => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        titleText="Multiselect with element items"
        label="Choose an item"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        itemToElement={(item) =>
          item ? (
            <span className="test">
              {item.text}{' '}
              <span role="img" alt="fire">
                {' '}
                🔥
              </span>
            </span>
          ) : (
            ''
          )
        }
      />
      <br />
      <FilterableMultiSelect
        titleText="Filterable Multiselect with element items"
        placeholder="itemToElement example"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        itemToElement={(item) =>
          item ? (
            <span className="test">
              {item.text}{' '}
              <span role="img" alt="fire">
                {' '}
                🔥
              </span>
            </span>
          ) : (
            ''
          )
        }
      />
    </div>
  );
});

Default.storyName = 'default';

Default.parameters = {
  info: {
    text: `
        MultiSelect
      `,
  },
};

export const WithInitialSelectedItems = withReadme(readme, () => {
  const {
    listBoxMenuIconTranslationIds,
    selectionFeedback,
    ...multiSelectProps
  } = props();

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        {...multiSelectProps}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        initialSelectedItems={[items[0], items[1]]}
        translateWithId={(id) => listBoxMenuIconTranslationIds[id]}
        selectionFeedback={selectionFeedback}
      />
    </div>
  );
});

WithInitialSelectedItems.storyName = 'with initial selected items';

WithInitialSelectedItems.parameters = {
  info: {
    text: `
        Provide a set of items to initially select in the control
      `,
  },
};

export const _Filterable = withReadme(readme, () => {
  const {
    listBoxMenuIconTranslationIds,
    selectionFeedback,
    ...multiSelectProps
  } = props();

  return (
    <div style={{ width: 300 }}>
      <FilterableMultiSelect
        {...multiSelectProps}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        placeholder={defaultPlaceholder}
        translateWithId={(id) => listBoxMenuIconTranslationIds[id]}
        selectionFeedback={selectionFeedback}
        onMenuChange={(e) => {
          multiSelectProps.onMenuChange(e);
        }}
      />
    </div>
  );
});

_Filterable.storyName = 'filterable';

_Filterable.parameters = {
  info: {
    text: `
        When a list contains more than 25 items, use \`MultiSelect.Filterable\` to help find options from the list.
      `,
  },
};

export const WithChangeOnClose = withReadme(readme, () => {
  const {
    listBoxMenuIconTranslationIds,
    selectionFeedback,
    ...multiSelectProps
  } = props();

  const [hasFocus, setHasFocus] = useState(false);
  const [active, setActive] = useState(false);
  const [selItems, setSelItems] = useState([items[0]]);
  if (!hasFocus && active && selItems.length == 0) {
    setActive(false);
  }

  return (
    <div style={{ width: 300 }}>
      <Checkbox
        id="active"
        checked={active}
        onChange={(a) => {
          setActive(a);
          if (a) {
            setSelItems([items[0]]);
          }
        }}
        labelText="Active"
      />
      <MultiSelect
        {...multiSelectProps}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        translateWithId={(id) => listBoxMenuIconTranslationIds[id]}
        selectionFeedback={selectionFeedback}
        key={active}
        disabled={!active}
        initialSelectedItems={selItems}
        onMenuChange={(e) => {
          multiSelectProps.onMenuChange(e);
          setHasFocus(e);
        }}
        onChange={(e) => {
          setSelItems(e.selectedItems);
        }}
      />
    </div>
  );
});
