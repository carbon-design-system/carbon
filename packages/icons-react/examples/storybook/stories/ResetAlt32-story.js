import React from 'react';
import { storiesOf } from '@storybook/react';
import ResetAlt32 from '../../../lib/reset--alt/32';

storiesOf('ResetAlt32', module)
  .add('default', () => <ResetAlt32 />)
  .add('with accessibility label', () => (
    <ResetAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ResetAlt32 focusable>
      <title>Icon title</title>
    </ResetAlt32>
  ));
