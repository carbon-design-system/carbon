/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Checkbox from '../Checkbox';
import CheckboxSkeleton from '../Checkbox/Checkbox.Skeleton';
import { settings } from 'carbon-components';

const { prefix } = settings;

const props = () => ({
  className: 'some-class',
  labelText: text('Label text (labelText)', 'Checkbox label'),
  indeterminate: boolean('Intermediate (indeterminate)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('No label (hideLabel)', false),
  wrapperClassName: text('Wrapper CSS class name (wrapperClassName)', ''),
  onChange: action('onChange'),
});

export default {
  title: 'Checkbox',
  decorators: [withKnobs],

  parameters: {
    component: Checkbox,

    subcomponents: {
      CheckboxSkeleton,
    },
  },
};

export const Checked = () => {
  const checkboxProps = props();
  return (
    <fieldset className={`${prefix}--fieldset`}>
      <legend className={`${prefix}--label`}>Checkbox heading</legend>
      <Checkbox defaultChecked {...checkboxProps} id="checkbox-label-1" />
      <Checkbox defaultChecked {...checkboxProps} id="checkbox-label-2" />
    </fieldset>
  );
};

Checked.storyName = 'checked';

Checked.parameters = {
  info: {
    text: `
    Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
    The example below shows how the Checkbox component can be used as an uncontrolled component that is initially checked
    by setting the defaultChecked property to true. To use the component in a controlled way, you should set the
    checked property instead.
  `,
  },
};

export const Unchecked = () => {
  const checkboxProps = props();
  return (
    <fieldset className={`${prefix}--fieldset`}>
      <legend className={`${prefix}--label`}>Checkbox heading</legend>
      <Checkbox {...checkboxProps} id="checkbox-label-1" />
      <Checkbox {...checkboxProps} id="checkbox-label-2" />
    </fieldset>
  );
};

Unchecked.storyName = 'unchecked';

Unchecked.parameters = {
  info: {
    text: `
      Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
      The example below shows how the Checkbox component can be used as an uncontrolled component that is initially
      unchecked. To use the component in a controlled way, you should set the checked property instead.
    `,
  },
};

export const Skeleton = () => (
  <div
    aria-label="loading checkbox"
    aria-live="assertive"
    role="status"
    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
  >
    <CheckboxSkeleton />
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
