import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import TextInput from '../../elements/TextInput';

const TextInputProps = {
  children: 'This is a Label',
  className: 'some-class',
  id: 'test2',
  onBlur: () => { console.log('blur') },
  onClick: () => { console.log('click') },
  onChange: () => { console.log('change') },
  onFocus: () => { console.log('focus') },
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
