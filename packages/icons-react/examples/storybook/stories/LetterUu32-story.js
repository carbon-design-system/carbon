import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterUu32 from '../../../lib/letter--Uu/32';

storiesOf('LetterUu32', module)
  .add('default', () => <LetterUu32 />)
  .add('with accessibility label', () => (
    <LetterUu32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterUu32 focusable>
      <title>Icon title</title>
    </LetterUu32>
  ));
