import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterFf20 from '../../../es/letter--Ff/20.js';

storiesOf('LetterFf20', module)
  .add('default', () => <LetterFf20 />)
  .add('with accessibility label', () => (
    <LetterFf20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterFf20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterFf20>
  ));
