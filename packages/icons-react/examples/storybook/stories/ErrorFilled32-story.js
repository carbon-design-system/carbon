import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorFilled32 from '../../../lib/ErrorFilled/32';

storiesOf('ErrorFilled32', module)
  .add('default', () => <ErrorFilled32 />)
  .add('with accessibility label', () => (
    <ErrorFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorFilled32 focusable>
      <title>Icon title</title>
    </ErrorFilled32>
  ));
