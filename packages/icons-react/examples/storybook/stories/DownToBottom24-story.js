import React from 'react';
import { storiesOf } from '@storybook/react';
import DownToBottom24 from '../../../es/down-to-bottom/24.js';

storiesOf('DownToBottom24', module)
  .add('default', () => <DownToBottom24 />)
  .add('with accessibility label', () => (
    <DownToBottom24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DownToBottom24 aria-label="Icon label">
      <title>Icon title</title>
    </DownToBottom24>
  ));
