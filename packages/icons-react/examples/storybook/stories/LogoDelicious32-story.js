import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoDelicious32 from '../../../es/logo--delicious/32.js';

storiesOf('LogoDelicious32', module)
  .add('default', () => <LogoDelicious32 />)
  .add('with accessibility label', () => (
    <LogoDelicious32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoDelicious32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoDelicious32>
  ));
