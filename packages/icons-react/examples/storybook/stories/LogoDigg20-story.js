import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoDigg20 from '../../../es/logo--digg/20.js';

storiesOf('LogoDigg20', module)
  .add('default', () => <LogoDigg20 />)
  .add('with accessibility label', () => (
    <LogoDigg20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoDigg20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoDigg20>
  ));
