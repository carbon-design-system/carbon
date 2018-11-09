import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronSort32 from '../../../lib/ChevronSort/32';

storiesOf('ChevronSort32', module)
  .add('default', () => <ChevronSort32 />)
  .add('with accessibility label', () => (
    <ChevronSort32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronSort32 focusable>
      <title>Icon title</title>
    </ChevronSort32>
  ));
