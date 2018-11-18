import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLinkedin20 from '../../../es/logo--linkedin/20.js';

storiesOf('LogoLinkedin20', module)
  .add('default', () => <LogoLinkedin20 />)
  .add('with accessibility label', () => (
    <LogoLinkedin20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoLinkedin20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoLinkedin20>
  ));
