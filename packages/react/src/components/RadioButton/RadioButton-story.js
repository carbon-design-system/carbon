/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import mdx from './RadioButton.mdx';

const values = {
  'Option 1': 'radio-1',
  'Option 2': 'radio-2',
  'Option 3': 'radio-3',
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
    legendText: text(
      'The label (legend) of the RadioButtonGroup (legendText)',
      'Radio button heading'
    ),
    name: text(
      'The form control name (name in <RadioButtonGroup>)',
      'radio-button-group'
    ),
    valueSelected: select(
      'Value of the selected button (valueSelected in <RadioButtonGroup>)',
      values,
      'radio-3'
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
    labelText: text('The label of the RadioButton (labelText)', 'Option 1'),
  }),
};

export default {
  title: 'Components/RadioButton',
  decorators: [withKnobs],

  parameters: {
    component: RadioButtonGroup,
    docs: {
      page: mdx,
    },

    subcomponents: {
      RadioButton,
    },
  },
};

export const Default = () => {
  return (
    <RadioButtonGroup
      legendText="Radio button heading"
      name="radio-button-group"
      defaultSelected="radio-1">
      <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />
      <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
      <RadioButton labelText="Option 3" value="radio-3" id="radio-3" />
    </RadioButtonGroup>
  );
};

export const Playground = () => {
  const radioProps = props.radio();
  return (
    <RadioButtonGroup labelText="Radio Button group" {...props.group()}>
      <RadioButton value="radio-1" id="radio-1" {...radioProps} />
      <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
      <RadioButton labelText="Option 3" value="radio-3" id="radio-3" />
    </RadioButtonGroup>
  );
};
