import React from 'react';
import { storiesOf } from '@storybook/react';
import Reset32 from '../../../es/reset/32.js';

storiesOf('Reset32', module)
  .add('default', () => <Reset32 />)
  .add('with accessibility label', () => (
    <Reset32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Reset32 aria-label="Icon label">
      <title>Icon title</title>
    </Reset32>
  ));
