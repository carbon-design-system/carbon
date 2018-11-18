import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterIi24 from '../../../es/letter--Ii/24.js';

storiesOf('LetterIi24', module)
  .add('default', () => <LetterIi24 />)
  .add('with accessibility label', () => (
    <LetterIi24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterIi24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterIi24>
  ));
