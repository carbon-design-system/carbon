import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification16 from '../../../es/notification/16.js';

storiesOf('Notification16', module)
  .add('default', () => <Notification16 />)
  .add('with accessibility label', () => (
    <Notification16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Notification16 aria-label="Icon label">
      <title>Icon title</title>
    </Notification16>
  ));
