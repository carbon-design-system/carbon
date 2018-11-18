import React from 'react';
import { storiesOf } from '@storybook/react';
import SpellCheck32 from '../../../es/spell-check/32.js';

storiesOf('SpellCheck32', module)
  .add('default', () => <SpellCheck32 />)
  .add('with accessibility label', () => (
    <SpellCheck32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SpellCheck32 aria-label="Icon label">
      <title>Icon title</title>
    </SpellCheck32>
  ));
