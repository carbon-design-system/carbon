import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoDelicious20 from '../../../es/logo--delicious/20.js';

storiesOf('LogoDelicious20', module)
  .add('default', () => <LogoDelicious20 />)
  .add('with accessibility label', () => (
    <LogoDelicious20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoDelicious20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoDelicious20>
  ));
