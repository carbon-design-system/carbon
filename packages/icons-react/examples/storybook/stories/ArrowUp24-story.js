import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUp24 from '../../../es/arrow--up/24.js';

storiesOf('ArrowUp24', module)
  .add('default', () => <ArrowUp24 />)
  .add('with accessibility label', () => (
    <ArrowUp24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUp24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUp24>
  ));
