import React from 'react';
import { storiesOf } from '@storybook/react';
import Watson32 from '../../../lib/Watson/32';

storiesOf('Watson32', module)
  .add('default', () => <Watson32 />)
  .add('with accessibility label', () => (
    <Watson32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Watson32 focusable>
      <title>Icon title</title>
    </Watson32>
  ));
