import React from 'react';
import { storiesOf } from '@storybook/react';
import Reset20 from '../../../es/reset/20.js';

storiesOf('Reset20', module)
  .add('default', () => <Reset20 />)
  .add('with accessibility label', () => (
    <Reset20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Reset20 aria-label="Icon label">
      <title>Icon title</title>
    </Reset20>
  ));
