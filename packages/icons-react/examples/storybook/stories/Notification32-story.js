import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification32 from '../../../lib/Notification/32';

storiesOf('Notification32', module)
  .add('default', () => <Notification32 />)
  .add('with accessibility label', () => (
    <Notification32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Notification32 focusable>
      <title>Icon title</title>
    </Notification32>
  ));
