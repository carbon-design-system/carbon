import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowLeft16 from '../../../lib/ArrowLeft/16';

storiesOf('ArrowLeft16', module)
  .add('default', () => <ArrowLeft16 />)
  .add('with accessibility label', () => (
    <ArrowLeft16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowLeft16 focusable>
      <title>Icon title</title>
    </ArrowLeft16>
  ));
