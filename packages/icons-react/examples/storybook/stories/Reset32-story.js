import React from 'react';
import { storiesOf } from '@storybook/react';
import Reset32 from '../../../lib/Reset/32';

storiesOf('Reset32', module)
  .add('default', () => <Reset32 />)
  .add('with accessibility label', () => (
    <Reset32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Reset32 focusable>
      <title>Icon title</title>
    </Reset32>
  ));
