import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_032 from '../../../lib/Number_0/32';

storiesOf('Number_032', module)
  .add('default', () => <Number_032 />)
  .add('with accessibility label', () => (
    <Number_032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_032 focusable>
      <title>Icon title</title>
    </Number_032>
  ));
