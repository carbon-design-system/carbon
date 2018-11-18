import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpLeft24 from '../../../es/arrow--up-left/24.js';

storiesOf('ArrowUpLeft24', module)
  .add('default', () => <ArrowUpLeft24 />)
  .add('with accessibility label', () => (
    <ArrowUpLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUpLeft24>
  ));
