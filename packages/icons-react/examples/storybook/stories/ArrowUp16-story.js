import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUp16 from '../../../lib/arrow--up/16';

storiesOf('ArrowUp16', module)
  .add('default', () => <ArrowUp16 />)
  .add('with accessibility label', () => (
    <ArrowUp16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUp16 focusable>
      <title>Icon title</title>
    </ArrowUp16>
  ));
