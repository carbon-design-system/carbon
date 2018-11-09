import React from 'react';
import { storiesOf } from '@storybook/react';
import MacOption32 from '../../../lib/MacOption/32';

storiesOf('MacOption32', module)
  .add('default', () => <MacOption32 />)
  .add('with accessibility label', () => (
    <MacOption32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacOption32 focusable>
      <title>Icon title</title>
    </MacOption32>
  ));
