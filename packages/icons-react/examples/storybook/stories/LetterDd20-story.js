import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterDd20 from '../../../es/letter--Dd/20.js';

storiesOf('LetterDd20', module)
  .add('default', () => <LetterDd20 />)
  .add('with accessibility label', () => (
    <LetterDd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterDd20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterDd20>
  ));
