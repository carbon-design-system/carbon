import React from 'react';
import { storiesOf } from '@storybook/react';
import Archive24 from '../../../es/archive/24.js';

storiesOf('Archive24', module)
  .add('default', () => <Archive24 />)
  .add('with accessibility label', () => (
    <Archive24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Archive24 aria-label="Icon label">
      <title>Icon title</title>
    </Archive24>
  ));
