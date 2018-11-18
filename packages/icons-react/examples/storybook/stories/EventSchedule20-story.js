import React from 'react';
import { storiesOf } from '@storybook/react';
import EventSchedule20 from '../../../es/event--schedule/20.js';

storiesOf('EventSchedule20', module)
  .add('default', () => <EventSchedule20 />)
  .add('with accessibility label', () => (
    <EventSchedule20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <EventSchedule20 aria-label="Icon label">
      <title>Icon title</title>
    </EventSchedule20>
  ));
