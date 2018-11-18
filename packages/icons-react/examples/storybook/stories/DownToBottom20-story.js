import React from 'react';
import { storiesOf } from '@storybook/react';
import DownToBottom20 from '../../../es/down-to-bottom/20.js';

storiesOf('DownToBottom20', module)
  .add('default', () => <DownToBottom20 />)
  .add('with accessibility label', () => (
    <DownToBottom20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DownToBottom20 aria-label="Icon label">
      <title>Icon title</title>
    </DownToBottom20>
  ));
