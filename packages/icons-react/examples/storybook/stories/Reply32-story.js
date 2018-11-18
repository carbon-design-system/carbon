import React from 'react';
import { storiesOf } from '@storybook/react';
import Reply32 from '../../../es/reply/32.js';

storiesOf('Reply32', module)
  .add('default', () => <Reply32 />)
  .add('with accessibility label', () => (
    <Reply32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Reply32 aria-label="Icon label">
      <title>Icon title</title>
    </Reply32>
  ));
