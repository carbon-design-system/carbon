import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterEe32 from '../../../es/letter--Ee/32.js';

storiesOf('LetterEe32', module)
  .add('default', () => <LetterEe32 />)
  .add('with accessibility label', () => (
    <LetterEe32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterEe32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterEe32>
  ));
