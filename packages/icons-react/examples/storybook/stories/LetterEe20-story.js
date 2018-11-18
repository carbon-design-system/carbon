import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterEe20 from '../../../es/letter--Ee/20.js';

storiesOf('LetterEe20', module)
  .add('default', () => <LetterEe20 />)
  .add('with accessibility label', () => (
    <LetterEe20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterEe20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterEe20>
  ));
