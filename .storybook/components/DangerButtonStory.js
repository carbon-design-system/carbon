import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../components/AppContainer';
import DangerButton from '../../components/DangerButton';

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
  .addWithInfo(
    'button',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Danger buttons should be used for a negative action (such as Delete)
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows an enabled Danger Button component.
    `,
    () => (
      <DangerButton {...buttonEvents} className="some-class">
        Danger Button
      </DangerButton>
  ))
  .addWithInfo(
    'link',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Danger buttons should be used for a negative action (such as Delete)
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows an enabled Danger Button component with a link.
    `,
    () => (
      <DangerButton {...buttonEvents} href="#" className="some-class">Danger Link</DangerButton>
  ))
  .addWithInfo(
    'disabled',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Danger buttons should be used for a negative action (such as Delete)
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows a disabled Danger Button component.
    `,
    () => (
      <DangerButton {...buttonEvents} disabled>Disabled</DangerButton>
  ));
