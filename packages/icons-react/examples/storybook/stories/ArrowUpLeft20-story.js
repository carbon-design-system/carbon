import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpLeft20 from '../../../es/arrow--up-left/20.js';

storiesOf('ArrowUpLeft20', module)
  .add('default', () => <ArrowUpLeft20 />)
  .add('with accessibility label', () => (
    <ArrowUpLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUpLeft20>
  ));
