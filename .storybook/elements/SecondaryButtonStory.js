import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import SecondaryButton from '../../elements/SecondaryButton';

const buttonEvents = {
  onBlur: () => { console.log('blur')},
  onClick: () => { console.log('click')},
  onFocus: () => { console.log('focus')},
  onMouseDown: () => { console.log('mouseDown')},
  onMouseEnter: () => { console.log('mouseEnter')},
  onMouseLeave: () => { console.log('mouseLeave')},
  onMouseUp: () => { console.log('mouseUp')},
  className: 'some-class'
}

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
    <SecondaryButton {...buttonEvents} disabled={true}>Disabled</SecondaryButton>
  ))
