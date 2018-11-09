import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterMm32 from '../../../lib/LetterMm/32';

storiesOf('LetterMm32', module)
  .add('default', () => <LetterMm32 />)
  .add('with accessibility label', () => (
    <LetterMm32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterMm32 focusable>
      <title>Icon title</title>
    </LetterMm32>
  ));
