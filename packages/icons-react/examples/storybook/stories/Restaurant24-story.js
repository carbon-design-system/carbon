import React from 'react';
import { storiesOf } from '@storybook/react';
import Restaurant24 from '../../../es/restaurant/24.js';

storiesOf('Restaurant24', module)
  .add('default', () => <Restaurant24 />)
  .add('with accessibility label', () => (
    <Restaurant24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restaurant24 aria-label="Icon label">
      <title>Icon title</title>
    </Restaurant24>
  ));
