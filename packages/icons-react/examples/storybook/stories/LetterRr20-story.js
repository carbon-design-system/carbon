import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterRr20 from '../../../es/letter--Rr/20.js';

storiesOf('LetterRr20', module)
  .add('default', () => <LetterRr20 />)
  .add('with accessibility label', () => (
    <LetterRr20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterRr20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterRr20>
  ));
