import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDown32 from '../../../es/arrow--down/32.js';

storiesOf('ArrowDown32', module)
  .add('default', () => <ArrowDown32 />)
  .add('with accessibility label', () => (
    <ArrowDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDown32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDown32>
  ));
