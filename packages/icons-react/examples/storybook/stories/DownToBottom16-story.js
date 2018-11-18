import React from 'react';
import { storiesOf } from '@storybook/react';
import DownToBottom16 from '../../../es/down-to-bottom/16.js';

storiesOf('DownToBottom16', module)
  .add('default', () => <DownToBottom16 />)
  .add('with accessibility label', () => (
    <DownToBottom16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DownToBottom16 aria-label="Icon label">
      <title>Icon title</title>
    </DownToBottom16>
  ));
