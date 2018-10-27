import React from 'react';
import { storiesOf } from '@storybook/react';
import EventSchedule32 from '../../../lib/event--schedule/32';

storiesOf('EventSchedule32', module)
  .add('default', () => <EventSchedule32 />)
  .add('with accessibility label', () => (
    <EventSchedule32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <EventSchedule32 focusable>
      <title>Icon title</title>
    </EventSchedule32>
  ));
