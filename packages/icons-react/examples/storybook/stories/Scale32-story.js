import React from 'react';
import { storiesOf } from '@storybook/react';
import Scale32 from '../../../lib/Scale/32';

storiesOf('Scale32', module)
  .add('default', () => <Scale32 />)
  .add('with accessibility label', () => (
    <Scale32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Scale32 focusable>
      <title>Icon title</title>
    </Scale32>
  ));
