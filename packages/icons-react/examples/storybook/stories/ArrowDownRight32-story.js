import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownRight32 from '../../../es/arrow--down-right/32.js';

storiesOf('ArrowDownRight32', module)
  .add('default', () => <ArrowDownRight32 />)
  .add('with accessibility label', () => (
    <ArrowDownRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownRight32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDownRight32>
  ));
