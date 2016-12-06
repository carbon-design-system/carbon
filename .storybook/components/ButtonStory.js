import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../../components/Button';

const buttonEvents = {
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  className: 'some-class',
};

storiesOf('Buttons', module)
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
        <Button {...buttonEvents} className="some-class">
          Primary Button
        </Button>
        &nbsp;
        <Button {...buttonEvents} href="#" className="some-class">Primary Link</Button>
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
        <Button kind="secondary" {...buttonEvents} className="some-class">
          Secondary Button
        </Button>
        &nbsp;
        <Button kind="secondary" {...buttonEvents} href="#" className="some-class">Secondary Link</Button>
      </div>
  ))
  .addWithInfo(
    'Small Buttons',
    `
      Small buttons may be used when there is not enough vertical space for a regular sized button. This issue is most
      commonly found in tables. Small buttons should have three words or less.
    `,
    () => (
      <div>
        <Button small {...buttonEvents} className="some-class">
          Small Button
        </Button>
        &nbsp;
        <Button small {...buttonEvents} href="#" className="some-class">Small Link</Button>
      </div>
  ))
  .addWithInfo(
    'Disabled Button',
    `
      Disabled Buttons may be used when the user cannot proceed until input is collected.
    `,
    () => (
      <div>
        <Button {...buttonEvents} disabled>Disabled</Button>
      </div>
  ))
  .addWithInfo(
    'Button with Icon',
    `
      When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are
      always paired with text.
    `,
    () => (
      <div>
        <Button icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</Button>
        &nbsp;
        <Button kind="secondary" icon="search" iconDescription="Search" {...buttonEvents}>With an Icon</Button>
      </div>
  ))
  .addWithInfo(
    'Danger Buttons',
    `
      Buttons are used to initialize an action, either in the background or
      foreground of an experience. Danger buttons should be used for a negative action (such as Delete)
      on the page. Modify the behavior of the button by changing its event properties. The example below
      shows an enabled Danger Button component.
    `,
    () => (
      <div>
        <Button kind="danger" {...buttonEvents} className="some-class">
          Danger Button
        </Button>
        &nbsp;
        <Button kind="danger" {...buttonEvents} href="#" className="some-class">Danger Link</Button>
      </div>
  ));
