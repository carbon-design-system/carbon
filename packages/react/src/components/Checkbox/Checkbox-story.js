/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classNames from 'classnames';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Checkbox from '../Checkbox';
import CheckboxSkeleton from '../Checkbox/Checkbox.Skeleton';
import { settings } from 'carbon-components';
import mdx from './Checkbox.mdx';

const { prefix } = settings;

export default {
  title: 'Checkbox',
  component: Checkbox,
  subcomponents: {
    CheckboxSkeleton,
  },
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const checkbox = () => {
  return (
    <fieldset className={`${prefix}--fieldset`}>
      <legend className={`${prefix}--label`}>Checkbox heading</legend>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
    </fieldset>
  );
};

export const skeleton = () => (
  <div
    aria-label="loading checkbox"
    aria-live="assertive"
    role="status"
    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
  >
    <CheckboxSkeleton />
  </div>
);

const props = () => ({
  checked: boolean('Checked (checked)', false),
  className: 'some-class',
  labelText: text('Label text (labelText)', 'Checkbox label'),
  indeterminate: boolean('Intermediate (indeterminate)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('No label (hideLabel)', false),
  wrapperClassName: text('Wrapper CSS class name (wrapperClassName)', ''),
  onChange: action('onChange'),
});

export const playground = () => (
  <fieldset className={`${prefix}--fieldset`}>
    <legend
      className={classNames(`${prefix}--label`, {
        [`${prefix}--label--disabled`]: props().disabled,
      })}>
      Checkbox heading
    </legend>
    <Checkbox {...props()} id="checkbox-label-1" />
    <Checkbox {...props()} id="checkbox-label-2" />
  </fieldset>
);
