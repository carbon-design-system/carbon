import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterYy32 from '../../../lib/letter--Yy/32';

storiesOf('LetterYy32', module)
  .add('default', () => <LetterYy32 />)
  .add('with accessibility label', () => (
    <LetterYy32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterYy32 focusable>
      <title>Icon title</title>
    </LetterYy32>
  ));
