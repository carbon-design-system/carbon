import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorFilled20 from '../../../es/error--filled/20.js';

storiesOf('ErrorFilled20', module)
  .add('default', () => <ErrorFilled20 />)
  .add('with accessibility label', () => (
    <ErrorFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </ErrorFilled20>
  ));
