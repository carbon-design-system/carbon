import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGithub32 from '../../../es/logo--github/32.js';

storiesOf('LogoGithub32', module)
  .add('default', () => <LogoGithub32 />)
  .add('with accessibility label', () => (
    <LogoGithub32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGithub32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoGithub32>
  ));
