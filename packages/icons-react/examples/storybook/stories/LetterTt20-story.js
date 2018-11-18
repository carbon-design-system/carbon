import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterTt20 from '../../../es/letter--Tt/20.js';

storiesOf('LetterTt20', module)
  .add('default', () => <LetterTt20 />)
  .add('with accessibility label', () => (
    <LetterTt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterTt20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterTt20>
  ));
