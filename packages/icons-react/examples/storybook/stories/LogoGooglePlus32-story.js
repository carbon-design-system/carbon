import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGooglePlus32 from '../../../lib/logo--google-plus/32';

storiesOf('LogoGooglePlus32', module)
  .add('default', () => <LogoGooglePlus32 />)
  .add('with accessibility label', () => (
    <LogoGooglePlus32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGooglePlus32 focusable>
      <title>Icon title</title>
    </LogoGooglePlus32>
  ));
