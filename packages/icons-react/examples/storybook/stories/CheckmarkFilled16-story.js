import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkFilled16 from '../../../lib/CheckmarkFilled/16';

storiesOf('CheckmarkFilled16', module)
  .add('default', () => <CheckmarkFilled16 />)
  .add('with accessibility label', () => (
    <CheckmarkFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkFilled16 focusable>
      <title>Icon title</title>
    </CheckmarkFilled16>
  ));
