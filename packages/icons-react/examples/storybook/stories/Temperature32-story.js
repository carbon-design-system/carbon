import React from 'react';
import { storiesOf } from '@storybook/react';
import Temperature32 from '../../../lib/temperature/32';

storiesOf('Temperature32', module)
  .add('default', () => <Temperature32 />)
  .add('with accessibility label', () => (
    <Temperature32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Temperature32 focusable>
      <title>Icon title</title>
    </Temperature32>
  ));
