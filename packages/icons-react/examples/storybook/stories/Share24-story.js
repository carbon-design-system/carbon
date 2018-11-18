import React from 'react';
import { storiesOf } from '@storybook/react';
import Share24 from '../../../es/share/24.js';

storiesOf('Share24', module)
  .add('default', () => <Share24 />)
  .add('with accessibility label', () => (
    <Share24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Share24 aria-label="Icon label">
      <title>Icon title</title>
    </Share24>
  ));
