import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUp20 from '../../../es/arrow--up/20.js';

storiesOf('ArrowUp20', module)
  .add('default', () => <ArrowUp20 />)
  .add('with accessibility label', () => (
    <ArrowUp20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUp20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUp20>
  ));
