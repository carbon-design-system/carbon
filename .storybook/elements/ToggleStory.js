import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Toggle from '../../elements/Toggle';

const toggleProps = {
  onBlur: () => { console.log('blur')},
  onClick: () => { console.log('click')},
  onFocus: () => { console.log('focus')},
  onMouseDown: () => { console.log('mouseDown')},
  onMouseEnter: () => { console.log('mouseEnter')},
  onMouseLeave: () => { console.log('mouseLeave')},
  onMouseUp: () => { console.log('mouseUp')},
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
