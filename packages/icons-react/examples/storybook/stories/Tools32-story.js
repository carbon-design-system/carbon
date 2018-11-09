import React from 'react';
import { storiesOf } from '@storybook/react';
import Tools32 from '../../../lib/Tools/32';

storiesOf('Tools32', module)
  .add('default', () => <Tools32 />)
  .add('with accessibility label', () => (
    <Tools32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tools32 focusable>
      <title>Icon title</title>
    </Tools32>
  ));
