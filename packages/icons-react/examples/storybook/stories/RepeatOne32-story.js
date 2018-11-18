import React from 'react';
import { storiesOf } from '@storybook/react';
import RepeatOne32 from '../../../es/repeat--one/32.js';

storiesOf('RepeatOne32', module)
  .add('default', () => <RepeatOne32 />)
  .add('with accessibility label', () => (
    <RepeatOne32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RepeatOne32 aria-label="Icon label">
      <title>Icon title</title>
    </RepeatOne32>
  ));
