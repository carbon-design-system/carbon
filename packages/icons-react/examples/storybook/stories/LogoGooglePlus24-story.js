import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGooglePlus24 from '../../../es/logo--google-plus/24.js';

storiesOf('LogoGooglePlus24', module)
  .add('default', () => <LogoGooglePlus24 />)
  .add('with accessibility label', () => (
    <LogoGooglePlus24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGooglePlus24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoGooglePlus24>
  ));
