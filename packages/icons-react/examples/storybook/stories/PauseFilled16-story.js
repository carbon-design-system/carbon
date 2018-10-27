import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseFilled16 from '../../../lib/pause--filled/16';

storiesOf('PauseFilled16', module)
  .add('default', () => <PauseFilled16 />)
  .add('with accessibility label', () => (
    <PauseFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseFilled16 focusable>
      <title>Icon title</title>
    </PauseFilled16>
  ));
