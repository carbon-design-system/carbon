import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterLl24 from '../../../es/letter--Ll/24.js';

storiesOf('LetterLl24', module)
  .add('default', () => <LetterLl24 />)
  .add('with accessibility label', () => (
    <LetterLl24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterLl24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterLl24>
  ));
