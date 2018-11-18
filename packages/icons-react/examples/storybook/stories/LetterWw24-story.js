import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterWw24 from '../../../es/letter--Ww/24.js';

storiesOf('LetterWw24', module)
  .add('default', () => <LetterWw24 />)
  .add('with accessibility label', () => (
    <LetterWw24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterWw24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterWw24>
  ));
