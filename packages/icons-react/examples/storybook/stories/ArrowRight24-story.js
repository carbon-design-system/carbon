import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowRight24 from '../../../es/arrow--right/24.js';

storiesOf('ArrowRight24', module)
  .add('default', () => <ArrowRight24 />)
  .add('with accessibility label', () => (
    <ArrowRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowRight24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowRight24>
  ));
