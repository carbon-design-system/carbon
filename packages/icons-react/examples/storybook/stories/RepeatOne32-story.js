import React from 'react';
import { storiesOf } from '@storybook/react';
import RepeatOne32 from '../../../lib/RepeatOne/32';

storiesOf('RepeatOne32', module)
  .add('default', () => <RepeatOne32 />)
  .add('with accessibility label', () => (
    <RepeatOne32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RepeatOne32 focusable>
      <title>Icon title</title>
    </RepeatOne32>
  ));
