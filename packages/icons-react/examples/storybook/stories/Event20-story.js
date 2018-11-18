import React from 'react';
import { storiesOf } from '@storybook/react';
import Event20 from '../../../es/event/20.js';

storiesOf('Event20', module)
  .add('default', () => <Event20 />)
  .add('with accessibility label', () => (
    <Event20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Event20 aria-label="Icon label">
      <title>Icon title</title>
    </Event20>
  ));
