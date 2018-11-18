import React from 'react';
import { storiesOf } from '@storybook/react';
import Warning24 from '../../../es/warning/24.js';

storiesOf('Warning24', module)
  .add('default', () => <Warning24 />)
  .add('with accessibility label', () => (
    <Warning24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Warning24 aria-label="Icon label">
      <title>Icon title</title>
    </Warning24>
  ));
