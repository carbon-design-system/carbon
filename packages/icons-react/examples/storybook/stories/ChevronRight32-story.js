import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronRight32 from '../../../lib/ChevronRight/32';

storiesOf('ChevronRight32', module)
  .add('default', () => <ChevronRight32 />)
  .add('with accessibility label', () => (
    <ChevronRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronRight32 focusable>
      <title>Icon title</title>
    </ChevronRight32>
  ));
