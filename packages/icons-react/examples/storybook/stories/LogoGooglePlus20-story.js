import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGooglePlus20 from '../../../es/logo--google-plus/20.js';

storiesOf('LogoGooglePlus20', module)
  .add('default', () => <LogoGooglePlus20 />)
  .add('with accessibility label', () => (
    <LogoGooglePlus20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGooglePlus20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoGooglePlus20>
  ));
