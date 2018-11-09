import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorFilled16 from '../../../lib/ErrorFilled/16';

storiesOf('ErrorFilled16', module)
  .add('default', () => <ErrorFilled16 />)
  .add('with accessibility label', () => (
    <ErrorFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorFilled16 focusable>
      <title>Icon title</title>
    </ErrorFilled16>
  ));
