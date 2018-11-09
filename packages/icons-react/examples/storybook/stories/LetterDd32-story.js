import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterDd32 from '../../../lib/LetterDd/32';

storiesOf('LetterDd32', module)
  .add('default', () => <LetterDd32 />)
  .add('with accessibility label', () => (
    <LetterDd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterDd32 focusable>
      <title>Icon title</title>
    </LetterDd32>
  ));
