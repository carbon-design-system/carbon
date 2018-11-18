import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterSs32 from '../../../es/letter--Ss/32.js';

storiesOf('LetterSs32', module)
  .add('default', () => <LetterSs32 />)
  .add('with accessibility label', () => (
    <LetterSs32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterSs32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterSs32>
  ));
