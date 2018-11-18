import React from 'react';
import { storiesOf } from '@storybook/react';
import Home20 from '../../../es/home/20.js';

storiesOf('Home20', module)
  .add('default', () => <Home20 />)
  .add('with accessibility label', () => (
    <Home20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Home20 aria-label="Icon label">
      <title>Icon title</title>
    </Home20>
  ));
