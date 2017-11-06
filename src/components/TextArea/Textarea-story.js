import React from 'react';
import { action, storiesOf } from '@storybook/react';
import Textarea from '../TextArea';

const textareaProps = {
  labelText: 'This is a Label',
  className: 'some-class',
  onChange: action('onChange'),
  onClick: action('onClick'),
  placeholder: 'Hint text here',
  id: 'test2',
  cols: 50,
  rows: 4,
};

storiesOf('TextArea', module)
  .addWithInfo(
    'enabled',
    `
      Text areas enable the user to interact with and input data. A text area is used when you
      anticipate the user to input more than 1 sentence. The example belows shows an enabled
      Text Area component.
    `,
    () => (
      <Textarea {...textareaProps} />
  ))
  .addWithInfo(
    'disabled',
    `
      Text areas enable the user to interact with and input data. A text area is used when you
      anticipate the user to input more than 1 sentence. The example belows shows an disabled
      Text Area component.
    `,
    () => (
      <Textarea disabled {...textareaProps} placeholder={'Disabled'} />
  ));
