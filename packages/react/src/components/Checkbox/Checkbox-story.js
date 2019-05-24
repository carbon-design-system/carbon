/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add(
    'checked',
    () => {
      const checkboxProps = props();
      return (
        <fieldset className={`${prefix}--fieldset`}>
          <legend className={`${prefix}--label`}>Checkbox heading</legend>
          <Checkbox defaultChecked {...checkboxProps} id="checkbox-label-1" />
          <Checkbox defaultChecked {...checkboxProps} id="checkbox-label-2" />
        </fieldset>
      );
    },
    {
      info: {
        text: `
        Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
        The example below shows how the Checkbox component can be used as an uncontrolled component that is initially checked
        by setting the defaultChecked property to true. To use the component in a controlled way, you should set the
        checked property instead.
      `,
      },
    }
  )
  .add(
    'unchecked',
    () => {
      const checkboxProps = props();
      return (
        <fieldset className={`${prefix}--fieldset`}>
          <legend className={`${prefix}--label`}>Checkbox heading</legend>
          <Checkbox {...checkboxProps} id="checkbox-label-1" />
          <Checkbox {...checkboxProps} id="checkbox-label-2" />
        </fieldset>
      );
    },
    {
      info: {
        text: `
          Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
          The example below shows how the Checkbox component can be used as an uncontrolled component that is initially
          unchecked. To use the component in a controlled way, you should set the checked property instead.
        `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <CheckboxSkeleton />
      </div>
    ),
    {
      info: {
        text: `
          Placeholder skeleton state to use when content is loading.
        `,
      },
    }
  );
