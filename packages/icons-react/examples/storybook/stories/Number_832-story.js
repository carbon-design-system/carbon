import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_832 from '../../../lib/number--8/32';

storiesOf('Number_832', module)
  .add('default', () => <Number_832 />)
  .add('with accessibility label', () => (
    <Number_832 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_832 focusable>
      <title>Icon title</title>
    </Number_832>
  ));
