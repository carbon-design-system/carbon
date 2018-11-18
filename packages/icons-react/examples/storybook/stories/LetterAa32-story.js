import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterAa32 from '../../../es/letter--Aa/32.js';

storiesOf('LetterAa32', module)
  .add('default', () => <LetterAa32 />)
  .add('with accessibility label', () => (
    <LetterAa32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterAa32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterAa32>
  ));
