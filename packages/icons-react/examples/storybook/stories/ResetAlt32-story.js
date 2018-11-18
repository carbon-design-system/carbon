import React from 'react';
import { storiesOf } from '@storybook/react';
import ResetAlt32 from '../../../es/reset--alt/32.js';

storiesOf('ResetAlt32', module)
  .add('default', () => <ResetAlt32 />)
  .add('with accessibility label', () => (
    <ResetAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ResetAlt32 aria-label="Icon label">
      <title>Icon title</title>
    </ResetAlt32>
  ));
