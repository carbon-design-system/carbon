import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterZz32 from '../../../es/letter--Zz/32.js';

storiesOf('LetterZz32', module)
  .add('default', () => <LetterZz32 />)
  .add('with accessibility label', () => (
    <LetterZz32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterZz32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterZz32>
  ));
