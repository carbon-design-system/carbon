import React from 'react';
import { storiesOf } from '@storybook/react';
import Archive32 from '../../../es/archive/32.js';

storiesOf('Archive32', module)
  .add('default', () => <Archive32 />)
  .add('with accessibility label', () => (
    <Archive32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Archive32 aria-label="Icon label">
      <title>Icon title</title>
    </Archive32>
  ));
