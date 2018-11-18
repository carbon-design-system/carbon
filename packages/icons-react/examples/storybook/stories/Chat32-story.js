import React from 'react';
import { storiesOf } from '@storybook/react';
import Chat32 from '../../../es/chat/32.js';

storiesOf('Chat32', module)
  .add('default', () => <Chat32 />)
  .add('with accessibility label', () => (
    <Chat32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chat32 aria-label="Icon label">
      <title>Icon title</title>
    </Chat32>
  ));
