import React from 'react';
import { storiesOf } from '@storybook/react';
import MacShift24 from '../../../es/mac--shift/24.js';

storiesOf('MacShift24', module)
  .add('default', () => <MacShift24 />)
  .add('with accessibility label', () => (
    <MacShift24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacShift24 aria-label="Icon label">
      <title>Icon title</title>
    </MacShift24>
  ));
