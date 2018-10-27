import React from 'react';
import { storiesOf } from '@storybook/react';
import Flow32 from '../../../lib/flow/32';

storiesOf('Flow32', module)
  .add('default', () => <Flow32 />)
  .add('with accessibility label', () => (
    <Flow32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Flow32 focusable>
      <title>Icon title</title>
    </Flow32>
  ));
