import React from 'react';
import { storiesOf } from '@storybook/react';
import Chat20 from '../../../es/chat/20.js';

storiesOf('Chat20', module)
  .add('default', () => <Chat20 />)
  .add('with accessibility label', () => (
    <Chat20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chat20 aria-label="Icon label">
      <title>Icon title</title>
    </Chat20>
  ));
