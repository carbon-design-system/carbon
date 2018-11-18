import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterLl32 from '../../../es/letter--Ll/32.js';

storiesOf('LetterLl32', module)
  .add('default', () => <LetterLl32 />)
  .add('with accessibility label', () => (
    <LetterLl32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterLl32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterLl32>
  ));
