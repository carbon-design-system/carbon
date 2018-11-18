import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSkype32 from '../../../es/logo--skype/32.js';

storiesOf('LogoSkype32', module)
  .add('default', () => <LogoSkype32 />)
  .add('with accessibility label', () => (
    <LogoSkype32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSkype32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSkype32>
  ));
