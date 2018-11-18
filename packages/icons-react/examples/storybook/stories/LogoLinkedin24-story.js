import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLinkedin24 from '../../../es/logo--linkedin/24.js';

storiesOf('LogoLinkedin24', module)
  .add('default', () => <LogoLinkedin24 />)
  .add('with accessibility label', () => (
    <LogoLinkedin24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoLinkedin24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoLinkedin24>
  ));
