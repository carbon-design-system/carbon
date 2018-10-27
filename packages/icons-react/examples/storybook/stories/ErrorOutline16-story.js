import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorOutline16 from '../../../lib/error--outline/16';

storiesOf('ErrorOutline16', module)
  .add('default', () => <ErrorOutline16 />)
  .add('with accessibility label', () => (
    <ErrorOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorOutline16 focusable>
      <title>Icon title</title>
    </ErrorOutline16>
  ));
