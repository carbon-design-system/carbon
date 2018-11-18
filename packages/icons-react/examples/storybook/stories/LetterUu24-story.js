import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterUu24 from '../../../es/letter--Uu/24.js';

storiesOf('LetterUu24', module)
  .add('default', () => <LetterUu24 />)
  .add('with accessibility label', () => (
    <LetterUu24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterUu24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterUu24>
  ));
