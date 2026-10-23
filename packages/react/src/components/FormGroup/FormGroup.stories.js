/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FormGroup } from '../FormGroup';
import Checkbox from '../Checkbox';
import { Stack } from '../Stack';

import mdx from './FormGroup.mdx';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['children'],
    },
  },
};

export const Default = (args) => {
  return (
    <FormGroup style={{ maxWidth: '400px' }} {...args}>
      <Stack gap={3}>
        <Checkbox id="form-group-email" labelText="Email" />
        <Checkbox id="form-group-phone" labelText="Phone" />
        <Checkbox id="form-group-text-message" labelText="Text message" />
      </Stack>
    </FormGroup>
  );
};

Default.argTypes = {
  className: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
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
  className: 'some-class',
  disabled: false,
  invalid: false,
  legendId: 'form-group-1',
  legendText: 'Contact preferences',
  message: false,
  messageText: 'Form group message',
};
