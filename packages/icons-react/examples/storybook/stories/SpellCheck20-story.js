import React from 'react';
import { storiesOf } from '@storybook/react';
import SpellCheck20 from '../../../es/spell-check/20.js';

storiesOf('SpellCheck20', module)
  .add('default', () => <SpellCheck20 />)
  .add('with accessibility label', () => (
    <SpellCheck20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SpellCheck20 aria-label="Icon label">
      <title>Icon title</title>
    </SpellCheck20>
  ));
