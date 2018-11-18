import React from 'react';
import { storiesOf } from '@storybook/react';
import Terminal32 from '../../../es/terminal/32.js';

storiesOf('Terminal32', module)
  .add('default', () => <Terminal32 />)
  .add('with accessibility label', () => (
    <Terminal32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Terminal32 aria-label="Icon label">
      <title>Icon title</title>
    </Terminal32>
  ));
