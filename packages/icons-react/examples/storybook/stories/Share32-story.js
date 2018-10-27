import React from 'react';
import { storiesOf } from '@storybook/react';
import Share32 from '../../../lib/share/32';

storiesOf('Share32', module)
  .add('default', () => <Share32 />)
  .add('with accessibility label', () => (
    <Share32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Share32 focusable>
      <title>Icon title</title>
    </Share32>
  ));
