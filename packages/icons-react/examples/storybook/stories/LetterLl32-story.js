import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterLl32 from '../../../lib/letter--Ll/32';

storiesOf('LetterLl32', module)
  .add('default', () => <LetterLl32 />)
  .add('with accessibility label', () => (
    <LetterLl32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterLl32 focusable>
      <title>Icon title</title>
    </LetterLl32>
  ));
