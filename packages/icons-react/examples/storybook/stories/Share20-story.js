import React from 'react';
import { storiesOf } from '@storybook/react';
import Share20 from '../../../es/share/20.js';

storiesOf('Share20', module)
  .add('default', () => <Share20 />)
  .add('with accessibility label', () => (
    <Share20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Share20 aria-label="Icon label">
      <title>Icon title</title>
    </Share20>
  ));
