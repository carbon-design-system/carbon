import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterJj20 from '../../../es/letter--Jj/20.js';

storiesOf('LetterJj20', module)
  .add('default', () => <LetterJj20 />)
  .add('with accessibility label', () => (
    <LetterJj20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterJj20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterJj20>
  ));
