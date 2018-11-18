import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar20 from '../../../es/calendar/20.js';

storiesOf('Calendar20', module)
  .add('default', () => <Calendar20 />)
  .add('with accessibility label', () => (
    <Calendar20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calendar20 aria-label="Icon label">
      <title>Icon title</title>
    </Calendar20>
  ));
