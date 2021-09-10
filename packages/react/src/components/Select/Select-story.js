/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import Select from '../Select';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';
import SelectSkeleton from '../Select/Select.Skeleton';
import mdx from './Select.mdx';
import { FeatureFlags } from '../FeatureFlags';

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const props = {
  select: () => ({
    className: 'some-class',
    light: boolean('Light variant (light in <Select>)', false),
    inline: boolean(
      'Put control in-line with label (inline in <Select>)',
      false
    ),
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
  }),
  group: () => ({
    disabled: boolean('Disabled (disabled in <SelectItemGroup>)', false),
  }),
};

export default {
  title: 'Components/Select',
  decorators: [withKnobs],

  parameters: {
    component: Select,
    docs: {
      page: mdx,
    },

    subcomponents: {
      SelectItem,
      SelectItemGroup,
      SelectSkeleton,
    },
  },
};

export const Default = () => {
  const groupProps = props.group();
  return (
    <div style={{ width: 400 }}>
      <Select {...props.select()} id="select-1" defaultValue="placeholder-item">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItemGroup label="Category 1" {...groupProps}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Category 2" {...groupProps}>
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </SelectItemGroup>
      </Select>
    </div>
  );
};

Default.parameters = {
  info: {
    text: `
        Select displays a list below its title when selected. They are used primarily in forms,
        where a user chooses one option from a list. Once the user selects an item, the dropdown will
        disappear and the field will reflect the user's choice. Create Select Item components for each
        option in the list. The example below shows an enabled Select component with three items.
      `,
  },
};

export const Skeleton = () => (
  <div
    style={{ width: '300px' }}
    aria-label="loading select"
    aria-live="assertive"
    role="status"
    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
  >
    <SelectSkeleton />
  </div>
);

Skeleton.storyName = 'skeleton';

Skeleton.parameters = {
  info: {
    text: `
        Placeholder skeleton state to use when content is loading.
      `,
  },
};

export const classNameChangeTest = () => {
  return (
    <div style={{ width: 400 }}>
      <Select
        className="TEST_CLASS"
        id="select-1"
        defaultValue="placeholder-item">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="The class should be added to the label"
        />
        <SelectItemGroup label="Category 1">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Category 2">
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </SelectItemGroup>
      </Select>
      <br />
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <Select
          className="TEST_CLASS"
          id="select-1"
          defaultValue="placeholder-item">
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="The class should be added to the wrapper"
          />
          <SelectItemGroup label="Category 1">
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
          </SelectItemGroup>
          <SelectItemGroup label="Category 2">
            <SelectItem value="option-3" text="Option 3" />
            <SelectItem value="option-4" text="Option 4" />
          </SelectItemGroup>
        </Select>
      </FeatureFlags>
    </div>
  );
};
