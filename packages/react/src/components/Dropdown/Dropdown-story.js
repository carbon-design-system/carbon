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
  object,
  select,
  text,
} from '@storybook/addon-knobs';
import Dropdown from '../Dropdown';
import DropdownSkeleton from './Dropdown.Skeleton';
import mdx from './Dropdown.mdx';

const items = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3',
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const directions = {
  'Bottom (default)': 'bottom',
  'Top ': 'top',
};

const types = {
  Default: 'default',
  Inline: 'inline',
};

const props = () => ({
  id: text('Dropdown ID (id)', 'carbon-dropdown-example'),
  size: select('Field size (size)', sizes, undefined) || undefined,
  direction: select('Dropdown direction (direction)', directions, 'bottom'),
  label: text('Label (label)', 'Dropdown menu options'),
  ariaLabel: text('Aria Label (ariaLabel)', 'Dropdown'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  titleText: text('Title (titleText)', 'Dropdown label'),
  hideLabel: boolean('No title text shown (hideLabel)', false),
  helperText: text('Helper text (helperText)', 'This is some helper text.'),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'A valid value is required'
  ),
  type: select('Type (type)', types, 'default'),
  warn: boolean('Show warning state (warn)', false),
  warnText: text(
    'Warning state text (warnText)',
    'This mode may perform worse on older machines'
  ),
  listBoxMenuIconTranslationIds: object(
    'Listbox menu icon translation IDs (for translateWithId callback)',
    {
      'close.menu': 'Close menu',
      'open.menu': 'Open menu',
    }
  ),
});

export default {
  title: 'Components/Dropdown',
  decorators: [withKnobs],

  parameters: {
    component: Dropdown,

    subcomponents: {
      DropdownSkeleton,
    },
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      label="Dropdown menu options"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      onChange={action('onChange')}
    />
  </div>
);

export const Inline = () => (
  <div style={{ width: 600 }}>
    <Dropdown
      id="inline"
      titleText="Inline dropdown label"
      label="Dropdown menu options"
      type="inline"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      onChange={action('onChange')}
    />
  </div>
);

export const Playground = () => {
  const { listBoxMenuIconTranslationIds, ...dropdownProps } = props();
  return (
    <div style={{ width: 300 }}>
      <Dropdown
        {...dropdownProps}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        translateWithId={(id) => listBoxMenuIconTranslationIds[id]}
      />
    </div>
  );
};

export const Skeleton = () => (
  <div style={{ width: 300 }}>
    <DropdownSkeleton />
  </div>
);
