import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import Toggle from '../../elements/Toggle';

const toggleEvents = {
    onBlur: () => { console.log('blur')},
    onClick: () => { console.log('click')},
    onFocus: () => { console.log('focus')},
    onMouseDown: () => { console.log('mouseDown')},
    onMouseEnter: () => { console.log('mouseEnter')},
    onMouseLeave: () => { console.log('mouseLeave')},
    onMouseUp: () => { console.log('mouseUp')},
}

storiesOf('Toggle', module)
  .add('toggle', () => (
    <Toggle {...toggleEvents} className="some-class"></Toggle>
  ))
  .add('disabled', () => (
    <Toggle {...toggleEvents} disabled={true}></Toggle>
  ))
