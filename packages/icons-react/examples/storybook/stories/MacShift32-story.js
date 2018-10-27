import React from 'react';
import { storiesOf } from '@storybook/react';
import MacShift32 from '../../../lib/mac--shift/32';

storiesOf('MacShift32', module)
  .add('default', () => <MacShift32 />)
  .add('with accessibility label', () => (
    <MacShift32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacShift32 focusable>
      <title>Icon title</title>
    </MacShift32>
  ));
