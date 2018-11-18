import React from 'react';
import { storiesOf } from '@storybook/react';
import NotificationOff20 from '../../../es/notification--off/20.js';

storiesOf('NotificationOff20', module)
  .add('default', () => <NotificationOff20 />)
  .add('with accessibility label', () => (
    <NotificationOff20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NotificationOff20 aria-label="Icon label">
      <title>Icon title</title>
    </NotificationOff20>
  ));
