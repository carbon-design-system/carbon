import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterLl20 from '../../../es/letter--Ll/20.js';

storiesOf('LetterLl20', module)
  .add('default', () => <LetterLl20 />)
  .add('with accessibility label', () => (
    <LetterLl20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterLl20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterLl20>
  ));
