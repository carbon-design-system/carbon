import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterBb20 from '../../../es/letter--Bb/20.js';

storiesOf('LetterBb20', module)
  .add('default', () => <LetterBb20 />)
  .add('with accessibility label', () => (
    <LetterBb20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterBb20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterBb20>
  ));
