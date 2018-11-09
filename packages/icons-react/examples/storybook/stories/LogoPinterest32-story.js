import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoPinterest32 from '../../../lib/LogoPinterest/32';

storiesOf('LogoPinterest32', module)
  .add('default', () => <LogoPinterest32 />)
  .add('with accessibility label', () => (
    <LogoPinterest32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoPinterest32 focusable>
      <title>Icon title</title>
    </LogoPinterest32>
  ));
