/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
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
    text: 'Option 3',
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
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};

const sizes = {
  'Extra large size (xl)': 'xl',
  'Regular size (lg)': '',
  'Small size (sm)': 'sm',
};

const props = () => ({
  id: text('MultiSelect ID (id)', 'carbon-multiselect-example'),
  titleText: text('Title (titleText)', 'Multiselect title'),
  helperText: text('Helper text (helperText)', 'This is not helper text'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  useTitleInItem: boolean('Show tooltip on hover', false),
  type: select('UI type (Only for `<MultiSelect>`) (type)', types, 'default'),
  size: select('Field size (size)', sizes, '') || undefined,
  label: text('Label (label)', defaultLabel),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'Invalid Selection'
  ),
  onChange: action('onChange'),
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

storiesOf('MultiSelect', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withReadme(readme, () => {
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
            itemToString={item => (item ? item.text : '')}
            translateWithId={id => listBoxMenuIconTranslationIds[id]}
            selectionFeedback={selectionFeedback}
          />
        </div>
      );
    }),
    {
      info: {
        text: `
            MultiSelect
          `,
      },
    }
  )
  .add(
    'with initial selected items',
    withReadme(readme, () => {
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
            itemToString={item => (item ? item.text : '')}
            initialSelectedItems={[items[0], items[1]]}
            translateWithId={id => listBoxMenuIconTranslationIds[id]}
            selectionFeedback={selectionFeedback}
          />
        </div>
      );
    }),
    {
      info: {
        text: `
            Provide a set of items to initially select in the control
          `,
      },
    }
  )
  .add(
    'filterable',
    withReadme(readme, () => {
      const {
        listBoxMenuIconTranslationIds,
        selectionFeedback,
        ...multiSelectProps
      } = props();

      return (
        <div style={{ width: 300 }}>
          <MultiSelect.Filterable
            {...multiSelectProps}
            items={items}
            itemToString={item => (item ? item.text : '')}
            placeholder={defaultPlaceholder}
            translateWithId={id => listBoxMenuIconTranslationIds[id]}
            selectionFeedback={selectionFeedback}
          />
        </div>
      );
    }),
    {
      info: {
        text: `
            When a list contains more than 25 items, use \`MultiSelect.Filterable\` to help find options from the list.
          `,
      },
    }
  );
