import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import SecondaryButton from '../../elements/SecondaryButton';

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

storiesOf('SecondaryButton', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('button', () => (
    <SecondaryButton {...buttonEvents} className="some-class">
      Secondary Button
    </SecondaryButton>
  ))
  .add('link', () => (
    <SecondaryButton {...buttonEvents} href="#" className="some-class">Secondary Link</SecondaryButton>
  ))
  .add('disabled', () => (
    <SecondaryButton {...buttonEvents} disabled>Disabled</SecondaryButton>
  ));
