/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs } from '@storybook/addon-knobs';
import FluidForm from '../FluidForm';
import TextInput from '../TextInput';

const additionalProps = {
  className: 'some-class',
  onSubmit: (e) => {
    e.preventDefault();
    action('FormSubmitted')(e);
  },
};

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  placeholder: 'Placeholder text',
};

const InvalidPasswordProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'Password',
  invalid: true,
  invalidText:
    'Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number.',
};

export default {
  title: 'Experimental/FluidForm',
  decorators: [withKnobs],

  parameters: {
    component: FluidForm,
  },
};

export const Default = () => (
  <FluidForm {...additionalProps}>
    <TextInput {...TextInputProps} />

    <TextInput
      type="password"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
      {...InvalidPasswordProps}
    />
  </FluidForm>
);

Default.parameters = {
  info: {
    text: `
        Forms are widely used to collect user input.

        Form can have any number of react components enclosed within FormGroup component. FormGroup component
        is a wrapper for legend and fieldset component.

      `,
  },
};
