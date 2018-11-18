import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSnapchat24 from '../../../es/logo--snapchat/24.js';

storiesOf('LogoSnapchat24', module)
  .add('default', () => <LogoSnapchat24 />)
  .add('with accessibility label', () => (
    <LogoSnapchat24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSnapchat24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSnapchat24>
  ));
