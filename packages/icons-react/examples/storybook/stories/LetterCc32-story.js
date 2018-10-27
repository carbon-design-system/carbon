import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterCc32 from '../../../lib/letter--Cc/32';

storiesOf('LetterCc32', module)
  .add('default', () => <LetterCc32 />)
  .add('with accessibility label', () => (
    <LetterCc32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterCc32 focusable>
      <title>Icon title</title>
    </LetterCc32>
  ));
