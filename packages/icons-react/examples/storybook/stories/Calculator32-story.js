import React from 'react';
import { storiesOf } from '@storybook/react';
import Calculator32 from '../../../lib/calculator/32';

storiesOf('Calculator32', module)
  .add('default', () => <Calculator32 />)
  .add('with accessibility label', () => (
    <Calculator32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calculator32 focusable>
      <title>Icon title</title>
    </Calculator32>
  ));
