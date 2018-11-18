import React from 'react';
import { storiesOf } from '@storybook/react';
import Light24 from '../../../es/light/24.js';

storiesOf('Light24', module)
  .add('default', () => <Light24 />)
  .add('with accessibility label', () => (
    <Light24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Light24 aria-label="Icon label">
      <title>Icon title</title>
    </Light24>
  ));
