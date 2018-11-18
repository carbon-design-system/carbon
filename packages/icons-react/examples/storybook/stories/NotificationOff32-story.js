import React from 'react';
import { storiesOf } from '@storybook/react';
import NotificationOff32 from '../../../es/notification--off/32.js';

storiesOf('NotificationOff32', module)
  .add('default', () => <NotificationOff32 />)
  .add('with accessibility label', () => (
    <NotificationOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NotificationOff32 aria-label="Icon label">
      <title>Icon title</title>
    </NotificationOff32>
  ));
