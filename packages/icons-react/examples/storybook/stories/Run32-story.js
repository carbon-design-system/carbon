import React from 'react';
import { storiesOf } from '@storybook/react';
import Run32 from '../../../es/run/32.js';

storiesOf('Run32', module)
  .add('default', () => <Run32 />)
  .add('with accessibility label', () => (
    <Run32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Run32 aria-label="Icon label">
      <title>Icon title</title>
    </Run32>
  ));
