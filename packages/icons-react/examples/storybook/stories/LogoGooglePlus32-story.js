import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGooglePlus32 from '../../../es/logo--google-plus/32.js';

storiesOf('LogoGooglePlus32', module)
  .add('default', () => <LogoGooglePlus32 />)
  .add('with accessibility label', () => (
    <LogoGooglePlus32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGooglePlus32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoGooglePlus32>
  ));
