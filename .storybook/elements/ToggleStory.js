import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Toggle from '../../elements/Toggle';

const toggleProps = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('Toggle', module)
  .addDecorator((story) => (
    <AppContainer>
    {story()}
    </AppContainer>
  ))
  .add('toggle', () => (
    <Toggle {...toggleProps} className="some-class" id="toggle-1" />
  ))
  .add('disabled', () => (
    <Toggle {...toggleProps} disabled />
  ));
