import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextInput from '../TextInput';

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input',
  onClick: action('onClick'),
  onChange: action('onChange'),
  placeholder: 'Hint text here',
};

storiesOf('TextInput', module)
  .addWithInfo(
    'enabled',
    `
      Text fields enable the user to interact with and input data. A single line field field is
      used when the input anticipated by the user is a single line of text as opposed to a paragraph.
      The example below shows an enabled Text Input component. The default type is 'text' and its
      value can be either 'string' or 'number'.
    `,
    () => (
      <TextInput {...TextInputProps} />
  ))
  .addWithInfo(
    'disabled',
    `
      Text fields enable the user to interact with and input data. A single line field field is
      used when the input anticipated by the user is a single line of text as opposed to a paragraph.
      The example below shows a disabled Text Input component.
    `,
    () => (
      <TextInput disabled {...TextInputProps} />
  ))
  .addWithInfo(
    'email',
    `
      Text fields enable the user to interact with and input data. A single line field field is
      used when the input anticipated by the user is a single line of text as opposed to a paragraph.
      The example below shows an enabled Text Input component with type 'email'.
    `,
    () => (
      <TextInput {...TextInputProps} type={"email"} placeholder={"Please enter an email"} />
  ))
  .addWithInfo(
    'password',
    `
      Text fields enable the user to interact with and input data. A single line field field is
      used when the input anticipated by the user is a single line of text as opposed to a paragraph.
      The example below shows an enabled Text Input component with type 'password'.
    `,
    () => (
      <TextInput {...TextInputProps} type={"password"} placeholder={"Please enter a password"} />
  ));
