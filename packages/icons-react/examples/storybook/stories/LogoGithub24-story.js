import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGithub24 from '../../../es/logo--github/24.js';

storiesOf('LogoGithub24', module)
  .add('default', () => <LogoGithub24 />)
  .add('with accessibility label', () => (
    <LogoGithub24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGithub24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoGithub24>
  ));
