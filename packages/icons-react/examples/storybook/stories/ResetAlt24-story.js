import React from 'react';
import { storiesOf } from '@storybook/react';
import ResetAlt24 from '../../../es/reset--alt/24.js';

storiesOf('ResetAlt24', module)
  .add('default', () => <ResetAlt24 />)
  .add('with accessibility label', () => (
    <ResetAlt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ResetAlt24 aria-label="Icon label">
      <title>Icon title</title>
    </ResetAlt24>
  ));
