import React from 'react';
import { storiesOf } from '@storybook/react';
import NotificationOff24 from '../../../es/notification--off/24.js';

storiesOf('NotificationOff24', module)
  .add('default', () => <NotificationOff24 />)
  .add('with accessibility label', () => (
    <NotificationOff24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NotificationOff24 aria-label="Icon label">
      <title>Icon title</title>
    </NotificationOff24>
  ));
