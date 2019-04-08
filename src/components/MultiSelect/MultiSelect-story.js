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
    id: 'item-1',
    text: 'Item 1',
  },
  {
    id: 'item-2',
    text: 'Item 2',
  },
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};

const props = () => ({
  filterable: boolean(
    'Filterable (`<MultiSelect.Filterable>` instead of `<MultiSelect>`)',
    false
  ),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  useTitleInItem: boolean('Show tooltip on hover', false),
  type: select('UI type (Only for `<MultiSelect>`) (type)', types, 'default'),
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
    }
  ),
});

storiesOf('MultiSelect', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withReadme(readme, () => {
      const {
        filterable,
        listBoxMenuIconTranslationIds,
        ...multiSelectProps
      } = props();
      const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
      const placeholder = !filterable ? undefined : defaultPlaceholder;
      return (
        <div style={{ width: 300 }}>
          <ComponentToUse
            {...multiSelectProps}
            items={items}
            itemToString={item => (item ? item.text : '')}
            placeholder={placeholder}
            translateWithId={id => listBoxMenuIconTranslationIds[id]}
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
        filterable,
        listBoxMenuIconTranslationIds,
        ...multiSelectProps
      } = props();
      const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
      const placeholder = !filterable ? undefined : defaultPlaceholder;

      return (
        <div style={{ width: 300 }}>
          <ComponentToUse
            {...multiSelectProps}
            items={items}
            itemToString={item => (item ? item.text : '')}
            initialSelectedItems={[items[0], items[1]]}
            placeholder={placeholder}
            translateWithId={id => listBoxMenuIconTranslationIds[id]}
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
  );
