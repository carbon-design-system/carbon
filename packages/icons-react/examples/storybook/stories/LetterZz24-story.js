import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterZz24 from '../../../es/letter--Zz/24.js';

storiesOf('LetterZz24', module)
  .add('default', () => <LetterZz24 />)
  .add('with accessibility label', () => (
    <LetterZz24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterZz24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterZz24>
  ));
