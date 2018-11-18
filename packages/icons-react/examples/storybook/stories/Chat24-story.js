import React from 'react';
import { storiesOf } from '@storybook/react';
import Chat24 from '../../../es/chat/24.js';

storiesOf('Chat24', module)
  .add('default', () => <Chat24 />)
  .add('with accessibility label', () => (
    <Chat24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chat24 aria-label="Icon label">
      <title>Icon title</title>
    </Chat24>
  ));
