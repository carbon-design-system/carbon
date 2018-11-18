import React from 'react';
import { storiesOf } from '@storybook/react';
import ResetAlt20 from '../../../es/reset--alt/20.js';

storiesOf('ResetAlt20', module)
  .add('default', () => <ResetAlt20 />)
  .add('with accessibility label', () => (
    <ResetAlt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ResetAlt20 aria-label="Icon label">
      <title>Icon title</title>
    </ResetAlt20>
  ));
