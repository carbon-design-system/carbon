import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterEe24 from '../../../es/letter--Ee/24.js';

storiesOf('LetterEe24', module)
  .add('default', () => <LetterEe24 />)
  .add('with accessibility label', () => (
    <LetterEe24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterEe24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterEe24>
  ));
