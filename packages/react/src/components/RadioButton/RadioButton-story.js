/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import RadioButton from '../RadioButton';
import RadioButtonSkeleton from '../RadioButton/RadioButton.Skeleton';

const labelPositions = {
  'Left (left)': 'left',
  'Right (right)': 'right',
};

const radioProps = () => ({
  className: 'some-class',
  name: text('Form item name (name)', 'test'),
  value: text('Value (value)', 'standard'),
  labelText: text('Label text (labelText)', 'Standard Radio Button'),
  labelPosition: select(
    'Label position (labelPosition)',
    labelPositions,
    'right'
  ),
  checked: boolean('Checked (checked)', false),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
});

storiesOf('RadioButton', module)
  .addDecorator(withKnobs)
  .add('Default', () => <RadioButton id="radio-1" {...radioProps()} />, {
    info: {
      text: `
            Radio buttons are used when a list of two or more options are mutually exclusive,
            meaning the user must select only one option. The example below shows how the Radio Button component
            can be used as an uncontrolled component that is initially checked by setting the defaultChecked property
            to true. To use the component in a controlled way, set the checked property instead.
          `,
    },
  })
  .add(
    'skeleton',
    () => (
      <div>
        <RadioButtonSkeleton />
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
