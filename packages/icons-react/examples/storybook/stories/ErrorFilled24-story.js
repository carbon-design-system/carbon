import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorFilled24 from '../../../es/error--filled/24.js';

storiesOf('ErrorFilled24', module)
  .add('default', () => <ErrorFilled24 />)
  .add('with accessibility label', () => (
    <ErrorFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </ErrorFilled24>
  ));
