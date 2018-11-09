import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronDown32 from '../../../lib/ChevronDown/32';

storiesOf('ChevronDown32', module)
  .add('default', () => <ChevronDown32 />)
  .add('with accessibility label', () => (
    <ChevronDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronDown32 focusable>
      <title>Icon title</title>
    </ChevronDown32>
  ));
