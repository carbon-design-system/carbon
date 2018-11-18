import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUp32 from '../../../es/arrow--up/32.js';

storiesOf('ArrowUp32', module)
  .add('default', () => <ArrowUp32 />)
  .add('with accessibility label', () => (
    <ArrowUp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUp32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUp32>
  ));
