import React from 'react';
import { storiesOf } from '@storybook/react';
import Play32 from '../../../es/play/32.js';

storiesOf('Play32', module)
  .add('default', () => <Play32 />)
  .add('with accessibility label', () => (
    <Play32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Play32 aria-label="Icon label">
      <title>Icon title</title>
    </Play32>
  ));
