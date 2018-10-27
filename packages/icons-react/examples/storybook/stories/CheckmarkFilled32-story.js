import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkFilled32 from '../../../lib/checkmark--filled/32';

storiesOf('CheckmarkFilled32', module)
  .add('default', () => <CheckmarkFilled32 />)
  .add('with accessibility label', () => (
    <CheckmarkFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkFilled32 focusable>
      <title>Icon title</title>
    </CheckmarkFilled32>
  ));
