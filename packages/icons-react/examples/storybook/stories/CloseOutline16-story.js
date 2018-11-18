import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseOutline16 from '../../../es/close--outline/16.js';

storiesOf('CloseOutline16', module)
  .add('default', () => <CloseOutline16 />)
  .add('with accessibility label', () => (
    <CloseOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloseOutline16 aria-label="Icon label">
      <title>Icon title</title>
    </CloseOutline16>
  ));
