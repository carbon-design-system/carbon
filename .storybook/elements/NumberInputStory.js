import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import NumberInput from '../../elements/NumberInput';

const numberInputProps = {
  onBlur: () => { console.log('blur')},
  onClick: () => { console.log('click')},
  onFocus: () => { console.log('focus')},
  onKeyDown: () => { console.log('keydown')},
  className: 'some-class',
  type: 'number',
  step: 1,
};

storiesOf('NumberInput', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('enabled', () => (
    <NumberInput {...numberInputProps}>Number Input</NumberInput>
  ))
  .add('disabled', () => (
    <NumberInput disabled {...numberInputProps}>Number Input</NumberInput>
  ))