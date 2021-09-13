/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import FormGroup from './FormGroup';
import TextInput from '../TextInput';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import Button from '../Button';
import mdx from './FormGroup.mdx';

const props = () => ({
  disabled: boolean('Disabled (disabled)', false),
  legendId: text('Legend ID (legendId)', 'formgroup-legend-id'),
  legendText: text('Legend text (legendText)', 'FormGroup Legend'),
  hasMargin: boolean('Fieldset has bottom margin (hasMargin)', true),
});

export default {
  title: 'Components/FormGroup',

  parameters: {
    component: FormGroup,
    docs: {
      page: mdx,
    },
  },
};

export const _Default = () => (
  <FormGroup
    legendId="formgroup-legend-id"
    legendText="FormGroup Legend"
    style={{ maxWidth: '400px' }}>
    <div style={{ marginBottom: '1rem' }}>
      <TextInput id="one" labelText="First Name" />
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <TextInput id="two" labelText="Last Name" />
    </div>

    <RadioButtonGroup
      legendText="Radio button heading"
      name="radio-button-group"
      defaultSelected="radio-1">
      <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />
      <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
      <RadioButton labelText="Option 3" value="radio-3" id="radio-3" />
    </RadioButtonGroup>
  </FormGroup>
);

_Default.story = {
  name: 'Form Group',
};

export const Playground = () => (
  <>
    <FormGroup className="test" {...props()} style={{ maxWidth: '400px' }}>
      <TextInput
        id="one"
        labelText="First Name"
        style={{ marginBottom: '1rem' }}
      />
      <TextInput
        id="two"
        labelText="Last Name"
        style={{ marginBottom: '1rem' }}
      />

      <RadioButtonGroup
        legendText="Radio button heading"
        name="radio-button-group"
        defaultSelected="radio-1">
        <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />
        <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
        <RadioButton labelText="Option 3" value="radio-3" id="radio-3" />
      </RadioButtonGroup>
    </FormGroup>
    <Button>Submit</Button>
  </>
);
