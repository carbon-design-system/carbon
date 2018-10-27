import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar16 from '../../../lib/calendar/16';

storiesOf('Calendar16', module)
  .add('default', () => <Calendar16 />)
  .add('with accessibility label', () => (
    <Calendar16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calendar16 focusable>
      <title>Icon title</title>
    </Calendar16>
  ));
