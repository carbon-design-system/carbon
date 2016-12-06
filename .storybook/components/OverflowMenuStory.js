import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';

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
    '',
    `
      Overflow Menu is used when additional options are available to the user and there is a space constraint.
      Create Overflow Menu Item components for each option on the menu.
    `,
    () => (
      <OverflowMenu {...overflowMenuEvents}>
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Stop App"
        />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Restart App"
        />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Rename App"
        />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Edit Routes and Access"
        />
        <OverflowMenuItem
          {...overflowMenuItemEvents}
          itemText="Delete App"
          isDelete
          isLastItem
        />
      </OverflowMenu>
  ));
