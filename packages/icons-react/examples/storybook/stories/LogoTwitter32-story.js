import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoTwitter32 from '../../../es/logo--twitter/32.js';

storiesOf('LogoTwitter32', module)
  .add('default', () => <LogoTwitter32 />)
  .add('with accessibility label', () => (
    <LogoTwitter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoTwitter32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoTwitter32>
  ));
