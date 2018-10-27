import React from 'react';
import { storiesOf } from '@storybook/react';
import DownToBottom32 from '../../../lib/down-to-bottom/32';

storiesOf('DownToBottom32', module)
  .add('default', () => <DownToBottom32 />)
  .add('with accessibility label', () => (
    <DownToBottom32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DownToBottom32 focusable>
      <title>Icon title</title>
    </DownToBottom32>
  ));
