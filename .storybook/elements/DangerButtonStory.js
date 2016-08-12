import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import DangerButton from '../../elements/DangerButton';

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

storiesOf('DangerButton', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('button', () => (
    <DangerButton {...buttonEvents} className="some-class">
      Danger Button
    </DangerButton>
  ))
  .add('link', () => (
    <DangerButton {...buttonEvents} href="#" className="some-class">Danger Link</DangerButton>
  ))
  .add('disabled', () => (
    <DangerButton {...buttonEvents} disabled>Disabled</DangerButton>
  ));
