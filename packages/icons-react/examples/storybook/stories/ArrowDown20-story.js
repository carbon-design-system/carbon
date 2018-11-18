import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDown20 from '../../../es/arrow--down/20.js';

storiesOf('ArrowDown20', module)
  .add('default', () => <ArrowDown20 />)
  .add('with accessibility label', () => (
    <ArrowDown20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDown20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDown20>
  ));
