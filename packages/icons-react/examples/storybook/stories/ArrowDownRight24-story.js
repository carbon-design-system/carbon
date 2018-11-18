import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownRight24 from '../../../es/arrow--down-right/24.js';

storiesOf('ArrowDownRight24', module)
  .add('default', () => <ArrowDownRight24 />)
  .add('with accessibility label', () => (
    <ArrowDownRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownRight24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDownRight24>
  ));
