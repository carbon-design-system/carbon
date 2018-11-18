import React from 'react';
import { storiesOf } from '@storybook/react';
import Close32 from '../../../es/close/32.js';

storiesOf('Close32', module)
  .add('default', () => <Close32 />)
  .add('with accessibility label', () => (
    <Close32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Close32 aria-label="Icon label">
      <title>Icon title</title>
    </Close32>
  ));
