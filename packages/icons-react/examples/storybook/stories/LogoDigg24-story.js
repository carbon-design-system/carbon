import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoDigg24 from '../../../es/logo--digg/24.js';

storiesOf('LogoDigg24', module)
  .add('default', () => <LogoDigg24 />)
  .add('with accessibility label', () => (
    <LogoDigg24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoDigg24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoDigg24>
  ));
