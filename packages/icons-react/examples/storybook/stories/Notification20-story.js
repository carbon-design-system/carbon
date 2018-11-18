import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification20 from '../../../es/notification/20.js';

storiesOf('Notification20', module)
  .add('default', () => <Notification20 />)
  .add('with accessibility label', () => (
    <Notification20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Notification20 aria-label="Icon label">
      <title>Icon title</title>
    </Notification20>
  ));
