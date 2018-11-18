import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoFacebook24 from '../../../es/logo--facebook/24.js';

storiesOf('LogoFacebook24', module)
  .add('default', () => <LogoFacebook24 />)
  .add('with accessibility label', () => (
    <LogoFacebook24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoFacebook24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoFacebook24>
  ));
