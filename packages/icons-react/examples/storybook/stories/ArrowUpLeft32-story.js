import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpLeft32 from '../../../es/arrow--up-left/32.js';

storiesOf('ArrowUpLeft32', module)
  .add('default', () => <ArrowUpLeft32 />)
  .add('with accessibility label', () => (
    <ArrowUpLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpLeft32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUpLeft32>
  ));
