import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSkype20 from '../../../es/logo--skype/20.js';

storiesOf('LogoSkype20', module)
  .add('default', () => <LogoSkype20 />)
  .add('with accessibility label', () => (
    <LogoSkype20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSkype20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSkype20>
  ));
