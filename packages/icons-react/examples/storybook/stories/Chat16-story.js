import React from 'react';
import { storiesOf } from '@storybook/react';
import Chat16 from '../../../lib/Chat/16';

storiesOf('Chat16', module)
  .add('default', () => <Chat16 />)
  .add('with accessibility label', () => (
    <Chat16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chat16 focusable>
      <title>Icon title</title>
    </Chat16>
  ));
