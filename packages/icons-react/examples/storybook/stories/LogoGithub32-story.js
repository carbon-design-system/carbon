import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoGithub32 from '../../../lib/logo--github/32';

storiesOf('LogoGithub32', module)
  .add('default', () => <LogoGithub32 />)
  .add('with accessibility label', () => (
    <LogoGithub32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoGithub32 focusable>
      <title>Icon title</title>
    </LogoGithub32>
  ));
