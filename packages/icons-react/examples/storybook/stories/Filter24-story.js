import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter24 from '../../../es/filter/24.js';

storiesOf('Filter24', module)
  .add('default', () => <Filter24 />)
  .add('with accessibility label', () => (
    <Filter24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Filter24 aria-label="Icon label">
      <title>Icon title</title>
    </Filter24>
  ));
