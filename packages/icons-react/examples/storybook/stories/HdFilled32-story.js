import React from 'react';
import { storiesOf } from '@storybook/react';
import HdFilled32 from '../../../lib/HD--filled/32';

storiesOf('HdFilled32', module)
  .add('default', () => <HdFilled32 />)
  .add('with accessibility label', () => (
    <HdFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HdFilled32 focusable>
      <title>Icon title</title>
    </HdFilled32>
  ));
