import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderAvatar16 from '../../../lib/HeaderAvatar/16';

storiesOf('HeaderAvatar16', module)
  .add('default', () => <HeaderAvatar16 />)
  .add('with accessibility label', () => (
    <HeaderAvatar16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderAvatar16 focusable>
      <title>Icon title</title>
    </HeaderAvatar16>
  ));
