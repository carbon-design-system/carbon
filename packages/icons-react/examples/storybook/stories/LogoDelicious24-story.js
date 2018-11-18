import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoDelicious24 from '../../../es/logo--delicious/24.js';

storiesOf('LogoDelicious24', module)
  .add('default', () => <LogoDelicious24 />)
  .add('with accessibility label', () => (
    <LogoDelicious24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoDelicious24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoDelicious24>
  ));
