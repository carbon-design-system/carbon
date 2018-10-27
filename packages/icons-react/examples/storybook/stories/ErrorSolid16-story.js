import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorSolid16 from '../../../lib/error--solid/16';

storiesOf('ErrorSolid16', module)
  .add('default', () => <ErrorSolid16 />)
  .add('with accessibility label', () => (
    <ErrorSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorSolid16 focusable>
      <title>Icon title</title>
    </ErrorSolid16>
  ));
