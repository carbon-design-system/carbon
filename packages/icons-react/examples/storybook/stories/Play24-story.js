import React from 'react';
import { storiesOf } from '@storybook/react';
import Play24 from '../../../es/play/24.js';

storiesOf('Play24', module)
  .add('default', () => <Play24 />)
  .add('with accessibility label', () => (
    <Play24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Play24 aria-label="Icon label">
      <title>Icon title</title>
    </Play24>
  ));
