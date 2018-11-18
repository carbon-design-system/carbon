import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSkype24 from '../../../es/logo--skype/24.js';

storiesOf('LogoSkype24', module)
  .add('default', () => <LogoSkype24 />)
  .add('with accessibility label', () => (
    <LogoSkype24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSkype24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSkype24>
  ));
