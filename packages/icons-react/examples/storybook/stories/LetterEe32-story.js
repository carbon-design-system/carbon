import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterEe32 from '../../../lib/letter--Ee/32';

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
