import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoPinterest20 from '../../../es/logo--pinterest/20.js';

storiesOf('LogoPinterest20', module)
  .add('default', () => <LogoPinterest20 />)
  .add('with accessibility label', () => (
    <LogoPinterest20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoPinterest20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoPinterest20>
  ));
