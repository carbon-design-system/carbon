import React from 'react';
import { storiesOf } from '@storybook/react';
import Debug24 from '../../../es/debug/24.js';

storiesOf('Debug24', module)
  .add('default', () => <Debug24 />)
  .add('with accessibility label', () => (
    <Debug24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Debug24 aria-label="Icon label">
      <title>Icon title</title>
    </Debug24>
  ));
