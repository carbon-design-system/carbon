import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import RadioButtonGroup from '../../elements/RadioButtonGroup';
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

storiesOf('RadioButtonGroup', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('radio button group', () => (
    <RadioButtonGroup name="radio-button-group" defaultSelected="default-selected">
      <RadioButton
        value="standard"
        id="radio-1"
        labelText="Standard Radio Button"
        className="some-class"
        {...radioProps}
      />
      <RadioButton
        value="default-selected"
        labelText="Default Selected Radio Button"
        id="radio-2"
        className="some-class"
        {...radioProps}
      />
      <RadioButton
        value="disabled"
        labelText="Disabled Radio Button"
        id="radio-3"
        className="some-class"
        disabled
        {...radioProps}
      />
    </RadioButtonGroup>
  ));
