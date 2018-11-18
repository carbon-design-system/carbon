import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterXx20 from '../../../es/letter--Xx/20.js';

storiesOf('LetterXx20', module)
  .add('default', () => <LetterXx20 />)
  .add('with accessibility label', () => (
    <LetterXx20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterXx20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterXx20>
  ));
