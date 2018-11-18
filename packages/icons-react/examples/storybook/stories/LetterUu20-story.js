import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterUu20 from '../../../es/letter--Uu/20.js';

storiesOf('LetterUu20', module)
  .add('default', () => <LetterUu20 />)
  .add('with accessibility label', () => (
    <LetterUu20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterUu20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterUu20>
  ));
