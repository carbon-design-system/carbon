import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGithub20 from '../../../es/logo--github/20.js';

storiesOf('LogoGithub20', module)
  .add('default', () => <LogoGithub20 />)
  .add('with accessibility label', () => (
    <LogoGithub20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGithub20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoGithub20>
  ));
