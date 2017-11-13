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
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Stop App" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Restart App" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Rename App" />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Edit Routes and Access"
        />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Delete App"
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
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Stop App" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Restart App" />
        <OverflowMenuItem {...overflowMenuItemEvents} itemText="Rename App" />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Edit Routes and Access"
        />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Delete App"
          hasDivider
          isDelete
        />
      </OverflowMenu>
    )
  );
