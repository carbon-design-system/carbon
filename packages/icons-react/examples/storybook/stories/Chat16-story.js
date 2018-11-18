import React from 'react';
import { storiesOf } from '@storybook/react';
import Chat16 from '../../../es/chat/16.js';

storiesOf('Chat16', module)
  .add('default', () => <Chat16 />)
  .add('with accessibility label', () => (
    <Chat16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chat16 aria-label="Icon label">
      <title>Icon title</title>
    </Chat16>
  ));
