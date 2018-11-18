import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterRr32 from '../../../es/letter--Rr/32.js';

storiesOf('LetterRr32', module)
  .add('default', () => <LetterRr32 />)
  .add('with accessibility label', () => (
    <LetterRr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterRr32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterRr32>
  ));
