import React from 'react';
import { storiesOf } from '@storybook/react';
import Move32 from '../../../lib/move/32';

storiesOf('Move32', module)
  .add('default', () => <Move32 />)
  .add('with accessibility label', () => (
    <Move32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Move32 focusable>
      <title>Icon title</title>
    </Move32>
  ));
