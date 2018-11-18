import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoTwitter24 from '../../../es/logo--twitter/24.js';

storiesOf('LogoTwitter24', module)
  .add('default', () => <LogoTwitter24 />)
  .add('with accessibility label', () => (
    <LogoTwitter24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoTwitter24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoTwitter24>
  ));
