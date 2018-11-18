import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar24 from '../../../es/calendar/24.js';

storiesOf('Calendar24', module)
  .add('default', () => <Calendar24 />)
  .add('with accessibility label', () => (
    <Calendar24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calendar24 aria-label="Icon label">
      <title>Icon title</title>
    </Calendar24>
  ));
