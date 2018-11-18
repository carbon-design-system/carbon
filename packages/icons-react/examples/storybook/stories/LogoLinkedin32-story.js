import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLinkedin32 from '../../../es/logo--linkedin/32.js';

storiesOf('LogoLinkedin32', module)
  .add('default', () => <LogoLinkedin32 />)
  .add('with accessibility label', () => (
    <LogoLinkedin32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoLinkedin32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoLinkedin32>
  ));
