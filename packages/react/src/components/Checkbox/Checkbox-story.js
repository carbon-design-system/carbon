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
import Button from '../../components/Button';
import CheckboxSkeleton from '../Checkbox/Checkbox.Skeleton';
import { settings } from 'carbon-components';
import mdx from './Checkbox.mdx';
import { FeatureFlags } from '../FeatureFlags';

const { prefix } = settings;

export default {
  title: 'Components/Checkbox',
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

export const checkboxNativeValidation = () => {
  function onSubmit(e) {
    e.preventDefault();
    var cb = e.target.querySelector('input[type=checkbox]');
    if (cb.checked === false) {
      cb.setCustomValidity('Privacy policy has to be accepted.');
      cb.reportValidity();
      return;
    }

    alert('submitted');
  }

  function onChange(e) {
    e.target.setCustomValidity('');
  }
  return (
    <form style={{ margin: '2em' }} onSubmit={onSubmit} onChange={onChange}>
      <legend className={`${prefix}--label`}>Validation example</legend>
      <Checkbox id="cb" labelText="Accept privacy policy" />
      <Button type="submit">Submit</Button>
    </form>
  );
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

export const unstable_Checkbox = () => {
  return (
    <FeatureFlags flags={{ 'enable-v11-release': true }}>
      <fieldset className={`${prefix}--fieldset`}>
        <legend className={`${prefix}--label`}>Checkbox heading</legend>
        <Checkbox
          {...props()}
          labelText={`Checkbox label`}
          id="checkbox-label-1"
        />
        <Checkbox
          {...props()}
          labelText={`Checkbox label`}
          id="checkbox-label-2"
        />
      </fieldset>
    </FeatureFlags>
  );
};

unstable_Checkbox.story = {
  name: 'unstable_Checkbox',
};

export const skeleton = () => <CheckboxSkeleton />;

const props = () => ({
  checked: boolean('Checked (checked)', false),
  className: 'some-class',
  labelText: text('Label text (labelText)', 'Checkbox label'),
  indeterminate: boolean('Intermediate (indeterminate)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('No label (hideLabel)', false),
  wrapperClassName: text('Wrapper CSS class name (wrapperClassName)', ''),
  onChange: action('onChange'),
  onClick: action('onClick'),
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
