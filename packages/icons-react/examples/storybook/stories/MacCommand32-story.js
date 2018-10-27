import React from 'react';
import { storiesOf } from '@storybook/react';
import MacCommand32 from '../../../lib/mac--command/32';

storiesOf('MacCommand32', module)
  .add('default', () => <MacCommand32 />)
  .add('with accessibility label', () => (
    <MacCommand32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacCommand32 focusable>
      <title>Icon title</title>
    </MacCommand32>
  ));
