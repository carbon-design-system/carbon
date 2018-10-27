import React from 'react';
import { storiesOf } from '@storybook/react';
import Terminal32 from '../../../lib/terminal/32';

storiesOf('Terminal32', module)
  .add('default', () => <Terminal32 />)
  .add('with accessibility label', () => (
    <Terminal32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Terminal32 focusable>
      <title>Icon title</title>
    </Terminal32>
  ));
