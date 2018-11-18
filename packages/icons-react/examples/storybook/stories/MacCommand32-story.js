import React from 'react';
import { storiesOf } from '@storybook/react';
import MacCommand32 from '../../../es/mac--command/32.js';

storiesOf('MacCommand32', module)
  .add('default', () => <MacCommand32 />)
  .add('with accessibility label', () => (
    <MacCommand32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacCommand32 aria-label="Icon label">
      <title>Icon title</title>
    </MacCommand32>
  ));
