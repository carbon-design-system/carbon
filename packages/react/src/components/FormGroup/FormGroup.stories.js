/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FormGroup } from '../FormGroup';
import TextInput from '../TextInput';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import Button from '../Button';
import { Stack } from '../Stack';

import mdx from './FormGroup.mdx';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  argTypes: {
    legendId: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    invalid: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <FormGroup style={{ maxWidth: '400px' }} {...args}>
      <Stack gap={7}>
        <TextInput id="one" labelText="First Name" />
        <TextInput id="two" labelText="Last Name" />
        <RadioButtonGroup
          legendText="Radio button heading"
          name="formgroup-default-radio-button-group"
          defaultSelected="radio-1">
          <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />
          <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
          <RadioButton labelText="Option 3" value="radio-3" id="radio-3" />
        </RadioButtonGroup>
        <Button>Submit</Button>
      </Stack>
    </FormGroup>
  );
};

Default.argTypes = {
  legendId: {
    control: {
      type: 'text',
    },
  },
  legendText: {
    control: {
      type: 'text',
    },
  },
  message: {
    control: {
      type: 'boolean',
    },
  },
  messageText: {
    control: {
      type: 'text',
    },
  },
};

Default.args = {
  legendId: 'form-group-1',
  legendText: 'FormGroup Legend',
  message: false,
};
