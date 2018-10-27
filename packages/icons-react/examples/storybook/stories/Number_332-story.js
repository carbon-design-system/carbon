import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_332 from '../../../lib/number--3/32';

storiesOf('Number_332', module)
  .add('default', () => <Number_332 />)
  .add('with accessibility label', () => (
    <Number_332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_332 focusable>
      <title>Icon title</title>
    </Number_332>
  ));
