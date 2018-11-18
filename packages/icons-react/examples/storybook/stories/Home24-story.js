import React from 'react';
import { storiesOf } from '@storybook/react';
import Home24 from '../../../es/home/24.js';

storiesOf('Home24', module)
  .add('default', () => <Home24 />)
  .add('with accessibility label', () => (
    <Home24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Home24 aria-label="Icon label">
      <title>Icon title</title>
    </Home24>
  ));
