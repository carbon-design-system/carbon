import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDown16 from '../../../lib/arrow--down/16';

storiesOf('ArrowDown16', module)
  .add('default', () => <ArrowDown16 />)
  .add('with accessibility label', () => (
    <ArrowDown16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDown16 focusable>
      <title>Icon title</title>
    </ArrowDown16>
  ));
