import React from 'react';
import { storiesOf } from '@storybook/react';
import Error24 from '../../../es/error/24.js';

storiesOf('Error24', module)
  .add('default', () => <Error24 />)
  .add('with accessibility label', () => (
    <Error24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Error24 aria-label="Icon label">
      <title>Icon title</title>
    </Error24>
  ));
