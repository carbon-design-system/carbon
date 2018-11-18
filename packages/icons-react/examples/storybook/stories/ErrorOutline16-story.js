import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorOutline16 from '../../../es/error--outline/16.js';

storiesOf('ErrorOutline16', module)
  .add('default', () => <ErrorOutline16 />)
  .add('with accessibility label', () => (
    <ErrorOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorOutline16 aria-label="Icon label">
      <title>Icon title</title>
    </ErrorOutline16>
  ));
