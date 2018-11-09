import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterOo32 from '../../../lib/LetterOo/32';

storiesOf('LetterOo32', module)
  .add('default', () => <LetterOo32 />)
  .add('with accessibility label', () => (
    <LetterOo32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterOo32 focusable>
      <title>Icon title</title>
    </LetterOo32>
  ));
