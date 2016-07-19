import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import DangerButton from '../../elements/DangerButton';

const buttonEvents = {
  onBlur: () => { console.log('blur')},
  onClick: () => { console.log('click')},
  onFocus: () => { console.log('focus')},
  onMouseEnter: () => { console.log('mouseEnter')},
  onMouseDown: () => { console.log('mouseDown')},
  className: 'some-class'
}

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
    <DangerButton {...buttonEvents} disabled={true}>Disabled</DangerButton>
  ))
