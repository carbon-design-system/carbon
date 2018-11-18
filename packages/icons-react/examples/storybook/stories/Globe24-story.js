import React from 'react';
import { storiesOf } from '@storybook/react';
import Globe24 from '../../../es/globe/24.js';

storiesOf('Globe24', module)
  .add('default', () => <Globe24 />)
  .add('with accessibility label', () => (
    <Globe24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Globe24 aria-label="Icon label">
      <title>Icon title</title>
    </Globe24>
  ));
