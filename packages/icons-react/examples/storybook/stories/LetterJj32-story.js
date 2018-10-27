import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterJj32 from '../../../lib/letter--Jj/32';

storiesOf('LetterJj32', module)
  .add('default', () => <LetterJj32 />)
  .add('with accessibility label', () => (
    <LetterJj32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterJj32 focusable>
      <title>Icon title</title>
    </LetterJj32>
  ));
