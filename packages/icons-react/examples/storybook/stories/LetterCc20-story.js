import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterCc20 from '../../../es/letter--Cc/20.js';

storiesOf('LetterCc20', module)
  .add('default', () => <LetterCc20 />)
  .add('with accessibility label', () => (
    <LetterCc20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterCc20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterCc20>
  ));
