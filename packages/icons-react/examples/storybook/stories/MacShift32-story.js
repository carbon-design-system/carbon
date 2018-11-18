import React from 'react';
import { storiesOf } from '@storybook/react';
import MacShift32 from '../../../es/mac--shift/32.js';

storiesOf('MacShift32', module)
  .add('default', () => <MacShift32 />)
  .add('with accessibility label', () => (
    <MacShift32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacShift32 aria-label="Icon label">
      <title>Icon title</title>
    </MacShift32>
  ));
