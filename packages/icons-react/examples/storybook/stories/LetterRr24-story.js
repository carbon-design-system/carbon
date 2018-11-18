import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterRr24 from '../../../es/letter--Rr/24.js';

storiesOf('LetterRr24', module)
  .add('default', () => <LetterRr24 />)
  .add('with accessibility label', () => (
    <LetterRr24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterRr24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterRr24>
  ));
