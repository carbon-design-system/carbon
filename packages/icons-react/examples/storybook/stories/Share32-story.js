import React from 'react';
import { storiesOf } from '@storybook/react';
import Share32 from '../../../es/share/32.js';

storiesOf('Share32', module)
  .add('default', () => <Share32 />)
  .add('with accessibility label', () => (
    <Share32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Share32 aria-label="Icon label">
      <title>Icon title</title>
    </Share32>
  ));
