import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLinkedin32 from '../../../lib/LogoLinkedin/32';

storiesOf('LogoLinkedin32', module)
  .add('default', () => <LogoLinkedin32 />)
  .add('with accessibility label', () => (
    <LogoLinkedin32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoLinkedin32 focusable>
      <title>Icon title</title>
    </LogoLinkedin32>
  ));
