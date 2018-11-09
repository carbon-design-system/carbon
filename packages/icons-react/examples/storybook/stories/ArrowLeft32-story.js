import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowLeft32 from '../../../lib/ArrowLeft/32';

storiesOf('ArrowLeft32', module)
  .add('default', () => <ArrowLeft32 />)
  .add('with accessibility label', () => (
    <ArrowLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowLeft32 focusable>
      <title>Icon title</title>
    </ArrowLeft32>
  ));
