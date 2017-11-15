import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';

const overflowMenuEvents = {
  onClick: action('onClick'),
  className: 'some-class',
};

const overflowMenuItemEvents = {
  onClick: action('onClick'),
  className: 'some-class',
};

storiesOf('OverflowMenu', module)
  .addWithInfo(
    'basic',
    `
      Overflow Menu is used when additional options are available to the user and there is a space constraint.
      Create Overflow Menu Item components for each option on the menu.
    `,
    () => (
      <OverflowMenu {...overflowMenuEvents}>
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 1" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 2" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 3" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 4" />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Danger option"
          hasDivider
          isDelete
        />
      </OverflowMenu>
    )
  )
  .addWithInfo(
    'floating menu',
    `
      Overflow Menu with the floatingMenu prop is used when you need to place an OverflowMenu
      inside a container with "overflow" CSS set.
    `,
    () => (
      <OverflowMenu {...overflowMenuEvents} floatingMenu>
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 1" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 2" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 3" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Option 4" />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Danger option"
          hasDivider
          isDelete
        />
      </OverflowMenu>
    )
  );
