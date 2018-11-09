import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterEe32 from '../../../lib/LetterEe/32';

storiesOf('LetterEe32', module)
  .add('default', () => <LetterEe32 />)
  .add('with accessibility label', () => (
    <LetterEe32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterEe32 focusable>
      <title>Icon title</title>
    </LetterEe32>
  ));
