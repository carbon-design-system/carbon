import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoFacebook20 from '../../../es/logo--facebook/20.js';

storiesOf('LogoFacebook20', module)
  .add('default', () => <LogoFacebook20 />)
  .add('with accessibility label', () => (
    <LogoFacebook20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoFacebook20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoFacebook20>
  ));
