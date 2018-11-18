import React from 'react';
import { storiesOf } from '@storybook/react';
import EventSchedule24 from '../../../es/event--schedule/24.js';

storiesOf('EventSchedule24', module)
  .add('default', () => <EventSchedule24 />)
  .add('with accessibility label', () => (
    <EventSchedule24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <EventSchedule24 aria-label="Icon label">
      <title>Icon title</title>
    </EventSchedule24>
  ));
