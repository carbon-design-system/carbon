import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import PrimaryButton from '../../elements/PrimaryButton';

const buttonEvents = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('PrimaryButton', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('button', () => (
    <PrimaryButton {...buttonEvents} className="some-class">
      Primary Button
    </PrimaryButton>
  ))
  .add('link', () => (
    <PrimaryButton {...buttonEvents} href="#" className="some-class">Primary Link</PrimaryButton>
  ))
  .add('disabled', () => (
    <PrimaryButton {...buttonEvents} disabled>Disabled</PrimaryButton>
  ));
