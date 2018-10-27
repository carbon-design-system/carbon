import React from 'react';
import { storiesOf } from '@storybook/react';
import Terminal16 from '../../../lib/terminal/16';

storiesOf('Terminal16', module)
  .add('default', () => <Terminal16 />)
  .add('with accessibility label', () => (
    <Terminal16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Terminal16 focusable>
      <title>Icon title</title>
    </Terminal16>
  ));
