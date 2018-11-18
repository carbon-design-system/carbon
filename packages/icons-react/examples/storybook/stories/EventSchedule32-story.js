import React from 'react';
import { storiesOf } from '@storybook/react';
import EventSchedule32 from '../../../es/event--schedule/32.js';

storiesOf('EventSchedule32', module)
  .add('default', () => <EventSchedule32 />)
  .add('with accessibility label', () => (
    <EventSchedule32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <EventSchedule32 aria-label="Icon label">
      <title>Icon title</title>
    </EventSchedule32>
  ));
