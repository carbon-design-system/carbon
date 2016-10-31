import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';
import AppContainer from '../../containers/AppContainer';

const overflowMenuEvents = {
  onClick: action('onClick'),
  className: 'some-class',
};

const overflowMenuItemEvents = {
  onClick: action('onClick'),
  className: 'some-class',
};

storiesOf('OverflowMenu', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('overflow-menu', () => (
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
