import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification16 from '../../../lib/Notification/16';

storiesOf('Notification16', module)
  .add('default', () => <Notification16 />)
  .add('with accessibility label', () => (
    <Notification16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Notification16 focusable>
      <title>Icon title</title>
    </Notification16>
  ));
