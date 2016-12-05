import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../components/AppContainer';
import PrimaryButton from '../../components/PrimaryButton';

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
  .addWithInfo(
    'button',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Primary buttons should be used for the principle call to action
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows an enabled Primary Button component.
    `,
    () => (
      <PrimaryButton {...buttonEvents} className="some-class">
        Primary Button
      </PrimaryButton>
  ))
  .addWithInfo(
    'link',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Primary buttons should be used for the principle call to action
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows an enabled Primary Button component with a link.
    `,
    () => (
      <PrimaryButton {...buttonEvents} href="#" className="some-class">Primary Link</PrimaryButton>
  ))
  .addWithInfo(
    'disabled',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Primary buttons should be used for the principle call to action
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows a disabled Primary Button component.
    `,
    () => (
      <PrimaryButton {...buttonEvents} disabled>Disabled</PrimaryButton>
  ))
  .addWithInfo(
    'icon',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Primary buttons should be used for the principle call to action
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows a Primary Button component with an embedded icon.
    `,
    () => (
      <PrimaryButton icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</PrimaryButton>
  ));
