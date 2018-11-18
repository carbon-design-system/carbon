import React from 'react';
import { storiesOf } from '@storybook/react';
import Terminal24 from '../../../es/terminal/24.js';

storiesOf('Terminal24', module)
  .add('default', () => <Terminal24 />)
  .add('with accessibility label', () => (
    <Terminal24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Terminal24 aria-label="Icon label">
      <title>Icon title</title>
    </Terminal24>
  ));
