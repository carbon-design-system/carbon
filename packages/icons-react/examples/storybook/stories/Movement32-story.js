import React from 'react';
import { storiesOf } from '@storybook/react';
import Movement32 from '../../../es/movement/32.js';

storiesOf('Movement32', module)
  .add('default', () => <Movement32 />)
  .add('with accessibility label', () => (
    <Movement32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Movement32 aria-label="Icon label">
      <title>Icon title</title>
    </Movement32>
  ));
