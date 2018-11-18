import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoDigg32 from '../../../es/logo--digg/32.js';

storiesOf('LogoDigg32', module)
  .add('default', () => <LogoDigg32 />)
  .add('with accessibility label', () => (
    <LogoDigg32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoDigg32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoDigg32>
  ));
