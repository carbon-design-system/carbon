import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpRight24 from '../../../es/arrow--up-right/24.js';

storiesOf('ArrowUpRight24', module)
  .add('default', () => <ArrowUpRight24 />)
  .add('with accessibility label', () => (
    <ArrowUpRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpRight24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUpRight24>
  ));
