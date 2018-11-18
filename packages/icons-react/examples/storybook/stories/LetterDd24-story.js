import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterDd24 from '../../../es/letter--Dd/24.js';

storiesOf('LetterDd24', module)
  .add('default', () => <LetterDd24 />)
  .add('with accessibility label', () => (
    <LetterDd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterDd24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterDd24>
  ));
