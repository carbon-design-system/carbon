import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import PrimaryButton from '../../elements/PrimaryButton';

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
    <PrimaryButton {...buttonEvents} disabled={true}>Disabled</PrimaryButton>
  ))
