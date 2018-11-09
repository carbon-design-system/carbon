import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterZz32 from '../../../lib/LetterZz/32';

storiesOf('LetterZz32', module)
  .add('default', () => <LetterZz32 />)
  .add('with accessibility label', () => (
    <LetterZz32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterZz32 focusable>
      <title>Icon title</title>
    </LetterZz32>
  ));
