/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import {
  Select,
  SelectItem,
  SelectItemGroup,
  SelectSkeleton,
} from 'carbon-components-react';

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const selectProps = {
  className: 'some-class',
  light: boolean('Light variant (light in <Select>)', false),
  inline: boolean('Put control in-line with label (inline in <Select>)', false),
  size: select('Field size (size)', sizes, undefined) || undefined,
  disabled: boolean('Disabled (disabled in <Select>)', false),
  hideLabel: boolean('No label (hideLabel in <Select>)', false),
  invalid: boolean('Show form validation UI (invalid in <Select>)', false),
  invalidText: text(
    'Form validation UI content (invalidText in <Select>)',
    'A valid value is required'
  ),
  labelText: text('Label text (labelText)', 'Select'),
  helperText: text('Helper text (helperText)', 'Optional helper text.'),
  onChange: action('onChange'),
  warn: boolean('Show warning state (warn)', false),
  warnText: text(
    'Warning state text (warnText)',
    'This will overwrite your current settings'
  ),
};

const selectGroupProps = {
  disabled: boolean('Disabled (disabled in <SelectItemGroup>)', false),
};

export default {
  title: 'Components/Select',
  decorators: [
    withKnobs,
    (story) => <div style={{ width: '400px' }}>{story()}</div>,
  ],
  parameters: {
    component: Select,
    subcomponents: {
      SelectItem,
      SelectItemGroup,
      SelectSkeleton,
    },
  },
};

export const _Default = () => {
  return (
    <div>
      <Select {...selectProps} id="select-1" defaultValue="placeholder-item">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItemGroup label="Category 1" {...selectGroupProps}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Category 2" {...selectGroupProps}>
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </SelectItemGroup>
      </Select>
    </div>
  );
};

export const _Skeleton = () => (
  <div
    aria-label="loading select"
    aria-live="assertive"
    role="status"
    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
  >
    <SelectSkeleton />
  </div>
);
