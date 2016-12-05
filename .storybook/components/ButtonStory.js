import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../components/AppContainer';
import PrimaryButton from '../../components/PrimaryButton';
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

storiesOf('Buttons', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    'Primary Buttons',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience.

      Primary buttons should be used for the principle call to action
      on the page. Modify the behavior of the button by changing its event properties.

      Small buttons may be used when there is not enough space for a
      regular sized button. This issue is most found in tables. Small button should have three words
      or less.

      The example below shows Primary Button component .
    `,
    () => (
      <div>
        <PrimaryButton {...buttonEvents} className="some-class">
          Primary Button
        </PrimaryButton>
        &nbsp;
        <PrimaryButton {...buttonEvents} href="#" className="some-class">Primary Link</PrimaryButton>
        &nbsp;
        <PrimaryButton {...buttonEvents} disabled>Disabled</PrimaryButton>
        &nbsp;
        <PrimaryButton icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</PrimaryButton>
        <br />
        <br />
        <PrimaryButton small {...buttonEvents} className="some-class">
          Small Button
        </PrimaryButton>
        &nbsp;
        <PrimaryButton small {...buttonEvents} href="#" className="some-class">Small Link</PrimaryButton>
        &nbsp;
        <PrimaryButton small {...buttonEvents} disabled>Small Disabled</PrimaryButton>
        &nbsp;
        <PrimaryButton small icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</PrimaryButton>
      </div>
  ))
  .addWithInfo(
    'Secondary Buttons',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Secondary buttons should be used for secondary actions on each page.
      Modify the behavior of the button by changing its property events.
      The example below shows a Secondary Button component.
    `,
    () => (
      <div>
        <SecondaryButton {...buttonEvents} className="some-class">
          Secondary Button
        </SecondaryButton>
        &nbsp;
        <SecondaryButton {...buttonEvents} href="#" className="some-class">Secondary Link</SecondaryButton>
        &nbsp;
        <SecondaryButton {...buttonEvents} disabled>Disabled</SecondaryButton>
        &nbsp;
        <SecondaryButton icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</SecondaryButton>
        <br />
        <br />
        <SecondaryButton small {...buttonEvents} className="some-class">
          Secondary button small
        </SecondaryButton>
        &nbsp;
        <SecondaryButton small {...buttonEvents} href="#" className="some-class">Secondary link small</SecondaryButton>
        &nbsp;
        <SecondaryButton small {...buttonEvents} disabled>Disabled</SecondaryButton>
        &nbsp;
        <SecondaryButton small icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</SecondaryButton>
      </div>
  ));
