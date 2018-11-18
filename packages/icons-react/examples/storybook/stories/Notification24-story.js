import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification24 from '../../../es/notification/24.js';

storiesOf('Notification24', module)
  .add('default', () => <Notification24 />)
  .add('with accessibility label', () => (
    <Notification24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Notification24 aria-label="Icon label">
      <title>Icon title</title>
    </Notification24>
  ));
