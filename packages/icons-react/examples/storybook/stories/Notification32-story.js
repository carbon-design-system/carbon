import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification32 from '../../../es/notification/32.js';

storiesOf('Notification32', module)
  .add('default', () => <Notification32 />)
  .add('with accessibility label', () => (
    <Notification32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Notification32 aria-label="Icon label">
      <title>Icon title</title>
    </Notification32>
  ));
