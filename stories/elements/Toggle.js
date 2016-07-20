import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import Toggle from '../../elements/Toggle';

storiesOf('Toggle', module)
  .add('toggle', () => (
    <Toggle className="user-provided-class"></Toggle>
  ))
  .add('disabled', () => (
    <Toggle disabled={true}></Toggle>
  ))
