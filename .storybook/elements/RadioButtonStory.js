import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import RadioButton from '../../elements/RadioButton';

const radioProps = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('RadioButton', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('radio button', () => (
    <RadioButton
      value="standard"
      labelText="Standard Radio Button (Will not be able to be checked since it's only one button)"
      id="radio-1"
      {...radioProps}
    />
  ))
  .add('disabled', () => (
    <RadioButton
      value="disabled"
      labelText="Disabled Radio Button"
      id="radio-2"
      disabled
      {...radioProps}
    />
  ));
