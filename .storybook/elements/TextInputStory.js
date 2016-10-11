import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import TextInput from '../../elements/TextInput';

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  label: 'Text Input',
  onClick: action('onClick'),
  onChange: action('onChange'),
  placeholder: 'Hint text here',
};

storiesOf('TextInput', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('enabled', () => (
    <TextInput {...TextInputProps} />
  ))
  .add('disabled', () => (
    <TextInput disabled {...TextInputProps} />
  ))
  .add('email', () => (
    <TextInput {...TextInputProps} type={"email"} placeholder={"Please enter an email"} />
  ))
  .add('password', () => (
    <TextInput {...TextInputProps} type={"password"} placeholder={"Please enter a password"} />
  ));
