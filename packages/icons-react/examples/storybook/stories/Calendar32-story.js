import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar32 from '../../../lib/Calendar/32';

storiesOf('Calendar32', module)
  .add('default', () => <Calendar32 />)
  .add('with accessibility label', () => (
    <Calendar32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calendar32 focusable>
      <title>Icon title</title>
    </Calendar32>
  ));
