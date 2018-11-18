import React from 'react';
import { storiesOf } from '@storybook/react';
import SpellCheck24 from '../../../es/spell-check/24.js';

storiesOf('SpellCheck24', module)
  .add('default', () => <SpellCheck24 />)
  .add('with accessibility label', () => (
    <SpellCheck24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SpellCheck24 aria-label="Icon label">
      <title>Icon title</title>
    </SpellCheck24>
  ));
