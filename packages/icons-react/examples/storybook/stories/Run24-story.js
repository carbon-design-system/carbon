import React from 'react';
import { storiesOf } from '@storybook/react';
import Run24 from '../../../es/run/24.js';

storiesOf('Run24', module)
  .add('default', () => <Run24 />)
  .add('with accessibility label', () => (
    <Run24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Run24 aria-label="Icon label">
      <title>Icon title</title>
    </Run24>
  ));
