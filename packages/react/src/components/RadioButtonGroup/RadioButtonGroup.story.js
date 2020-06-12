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
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import FormGroup from '../FormGroup';

const values = {
  standard: 'standard',
  'default-selected': 'default-selected',
  disabled: 'disabled',
};

const orientations = {
  'Horizontal (horizontal)': 'horizontal',
  'Vertical (vertical)': 'vertical',
};

const labelPositions = {
  'Left (left)': 'left',
  'Right (right)': 'right',
};

const props = {
  group: () => ({
    name: text(
      'The form control name (name in <RadioButtonGroup>)',
      'radio-button-group'
    ),
    valueSelected: select(
      'Value of the selected button (valueSelected in <RadioButtonGroup>)',
      values,
      'default-selected'
    ),
    orientation: select(
      'Radio button orientation (orientation)',
      orientations,
      'horizontal'
    ),
    labelPosition: select(
      'Label position (labelPosition)',
      labelPositions,
      'right'
    ),
    onChange: action('onChange'),
  }),
  radio: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled in <RadioButton>)', false),
    labelText: text(
      'Label text (labelText in <RadioButton>)',
      'Radio button label'
    ),
  }),
};

storiesOf('RadioButtonGroup', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const radioProps = props.radio();
      return (
        <FormGroup legendText="Radio Button heading">
          <RadioButtonGroup
            defaultSelected="default-selected"
            legend="Group Legend"
            {...props.group()}>
            <RadioButton value="standard" id="radio-1" {...radioProps} />
            <RadioButton
              value="default-selected"
              id="radio-2"
              {...radioProps}
            />
            <RadioButton value="disabled" id="radio-3" {...radioProps} />
          </RadioButtonGroup>
        </FormGroup>
      );
    },
    {
      info: {
        text: `
            The example below shows a Radio Button Group component with a default selected Radio Button.
            Although you can set the checked prop on the Radio Button, when using the Radio Button component
            as a child of the Radio Button Group, either set the defaultSelected or valueSelected which will
            automatically set the selected prop on the corresponding Radio Button component.
    
            Use defaultSelected when you want a radio button to be selected initially, but don't need to set it
            at a later time. If you do need to set it dynamically at a later time, then use the valueSelected property instead.
          `,
      },
    }
  );
