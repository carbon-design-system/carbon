import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoPinterest24 from '../../../es/logo--pinterest/24.js';

storiesOf('LogoPinterest24', module)
  .add('default', () => <LogoPinterest24 />)
  .add('with accessibility label', () => (
    <LogoPinterest24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoPinterest24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoPinterest24>
  ));
