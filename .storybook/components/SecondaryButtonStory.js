import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../components/AppContainer';
import SecondaryButton from '../../components/SecondaryButton';

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
  .addWithInfo(
    'button',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Secondary buttons should be used for secondary actions on each page.
      Modify the behavior of the button by changing its property events. The example below
      shows an enabled Secondary Button component.
    `,
    () => (
      <SecondaryButton {...buttonEvents} className="some-class">
        Secondary Button
      </SecondaryButton>
  ))
  .addWithInfo(
    'link',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Secondary buttons should be used for secondary actions on each page.
      Modify the behavior of the button by changing its property events. The example below
      shows an enabled Secondary Button component with a link.
    `,
    () => (
      <SecondaryButton {...buttonEvents} href="#" className="some-class">Secondary Link</SecondaryButton>
  ))
  .addWithInfo(
    'disabled',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Secondary buttons should be used for secondary actions on each page.
      Modify the behavior of the button by changing its property events. The example below
      shows a disabled Secondary Button component.
    `,
    () => (
      <SecondaryButton {...buttonEvents} disabled>Disabled</SecondaryButton>
  ))
  .addWithInfo(
    'icon',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Secondary buttons should be used for secondary actions on each page.
      Modify the behavior of the button by changing its property events. The example below
      shows a Secondary Button component with an embedded icon.
    `,
    () => (
      <SecondaryButton icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</SecondaryButton>
  ));
