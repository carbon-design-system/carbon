import React from 'react';
import { storiesOf } from '@storybook/react';
import Reply24 from '../../../es/reply/24.js';

storiesOf('Reply24', module)
  .add('default', () => <Reply24 />)
  .add('with accessibility label', () => (
    <Reply24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Reply24 aria-label="Icon label">
      <title>Icon title</title>
    </Reply24>
  ));
