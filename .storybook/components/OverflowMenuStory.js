import React from 'react';
import { storiesOf } from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../internal/OverflowMenuItem';
import AppContainer from '../../containers/AppContainer';

const overflowMenuEvents = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const overflowMenuItemEvents = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('OverflowMenu', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addDecorator(centered)
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
